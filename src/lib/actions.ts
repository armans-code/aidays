"use server";

import { Client } from "@googlemaps/google-maps-services-js";
import { AutocompleteAddress, RegisterFormData } from "../app/register/page";
import { createClerkClient } from "@clerk/backend";
import { db } from "../db";
import { Situation, situations, users, wants } from "../db/schema";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { metersToMiles } from "./utils";
import { generateEmbedding } from "./embedding";

export async function autocompleteAddress(input: string) {
  const client = new Client({});
  const result = await client.placeAutocomplete({
    params: {
      input,
      location: { lat: 29.643946, lng: -82.355659 }, // search near University of Florida, Gainesville
      origin: { lat: 29.643946, lng: -82.355659 },
      key: process.env.PLACES_API_KEY!,
    },
  });
  return result.data.predictions.map((p) => {
    return {
      name: p.description,
      place_id: p.place_id,
    };
  });
}

export async function registerUser(
  formData: RegisterFormData,
  address: AutocompleteAddress
) {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
  });
  const googleClient = new Client({});
  await clerkClient.users
    .createUser({
      username: formData.username,
      password: formData.password,
      // privateMetadata: {
      //   address_place_id: address.place_id,
      //   phone: formData.phone,
      // },
    })
    .then(async (user) => {
      const { username } = user;
      if (!username) {
        return;
      }
      const place = await googleClient.placeDetails({
        params: {
          key: process.env.PLACES_API_KEY!,
          place_id: address.place_id,
        },
      });
      const lat = place.data.result.geometry?.location.lat;
      const lon = place.data.result.geometry?.location.lng;
      await db.insert(users).values({
        username,
        clerk_id: user.id,
        lat: lat?.toString() ?? "",
        lon: lon?.toString() ?? "",
        place_id: address.place_id,
        address: address.name,
        phone: formData.phone,
      });
    });
}

export async function validateUsername(username: string) {
  // ensure username is valid
  if (username.length < 4) {
    throw new Error("Username must be at least 4 characters");
  }
  if (username.length > 15) {
    throw new Error("Username must be at most 15 characters");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error(
      "Username can only contain letters, numbers, and underscores"
    );
  }

  // ensure username exists
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
  if (user === undefined) {
    return true;
  }
  throw new Error("Username already exists");
}

export async function getUserAddress(clerkUserId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerk_id, clerkUserId),
  });
  if (user) {
    return { address: user.address, place_id: user.place_id };
  }
  throw new Error("User not found");
}

export async function createWant({
  clerkId,
  info,
  urgency,
  address,
  place_id,
}: {
  clerkId: string;
  info: string;
  urgency: string;
  address: string;
  place_id: string;
}) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerk_id, clerkId),
  });
  if (!user) {
    throw new Error("User not found");
  }

  const googleClient = new Client({});
  const place = await googleClient.placeDetails({
    params: {
      key: process.env.PLACES_API_KEY!,
      place_id: place_id,
    },
  });
  const lat = place.data.result.geometry?.location.lat as number;
  const lon = place.data.result.geometry?.location.lng as number;

  // forgive me for this
  const severity =
    urgency === "critical"
      ? 10
      : urgency === "high"
      ? 8
      : urgency === "medium"
      ? 5
      : 3;

  await db.insert(wants).values({
    user_id: user.id,
    description: info,
    address,
    place_id,
    severity,
    lon: lon.toString() ?? "",
    lat: lat.toString() ?? "",
  });
}

export async function getNearbyWants(clerkId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerk_id, clerkId),
  });
  if (!user) {
    throw new Error("User not found");
  }

  const query = sql`
  SELECT wants.lat, wants.lon, wants.id, wants.description, wants.address, wants.place_id, wants.severity,
         users.username,
         ST_DistanceSphere(
           ST_POINT(${Number(user.lon)}, ${Number(user.lat)}),
           ST_POINT(CAST(wants.lon AS float), CAST(wants.lat AS float))
         ) as distance
  FROM wants
  JOIN users ON wants.user_id = users.id
  ORDER BY distance ASC;
`;

  return (await db.execute(query)).rows.map((r) => {
    return {
      ...r,
      distance: metersToMiles(r.distance as number),
    };
  }) as Request[];
}

export async function getNearbySituations(clerkId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerk_id, clerkId),
  });
  if (!user) {
    throw new Error("User not found");
  }

  const query = sql`
  SELECT situations.lat, situations.lon, situations.id, situations.description, situations.address, situations.severity,
         situations.name,
         ST_DistanceSphere(
           ST_POINT(${Number(user.lon)}, ${Number(user.lat)}),
           ST_POINT(CAST(situations.lon AS float), CAST(situations.lat AS float))
         ) as distance
  FROM situations
  ORDER BY distance ASC;
`;

  return (await db.execute(query)).rows.map((r) => {
    return {
      ...r,
      username: r.name,
      distance: metersToMiles(r.distance as number),
    };
  }) as Request[];
}

export type Request = {
  id: number;
  severity: number;
  description: string;
  address: string;
  username: string;
  distance: number;
  similarity: number;
  lat: string;
  lon: string;
};

export async function getSimilarSituationsNearby(
  description: string,
  clerkId: string
) {
  const embedding = await generateEmbedding(description);

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerk_id, clerkId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const query = sql`
    SELECT situations.id, situations.severity, situations.description, 
           situations.address, situations.name, situations.lon, 
           situations.lat, situations.phone,
           1 - (${cosineDistance(
             situations.embedding,
             embedding
           )}) as similarity,
           ST_DistanceSphere(
             ST_POINT(${Number(user.lon)}, ${Number(user.lat)}),
             ST_POINT(CAST(situations.lon AS float), CAST(situations.lat AS float))
           ) as distance
    FROM situations
    WHERE 1 - (${cosineDistance(situations.embedding, embedding)}) > 0.5
    ORDER BY similarity DESC, distance ASC;
  `;

  return (await db.execute(query)).rows.map((r) => {
    return {
      ...r,
      username: r.name,
      distance: metersToMiles(r.distance as number),
    };
  }) as Request[];
}

export async function getSimilarWantsNearby(
  description: string,
  clerkId: string
) {
  const embedding = await generateEmbedding(description);

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerk_id, clerkId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const query = sql`
    SELECT wants.lat, wants.lon, wants.id, wants.description, wants.address, wants.place_id, wants.severity,
         users.username,
         1 - (${cosineDistance(
           situations.embedding,
           embedding
         )}) as similiarity,
         ST_DistanceSphere(
           ST_POINT(${Number(user.lon)}, ${Number(user.lat)}),
           ST_POINT(CAST(wants.lon AS float), CAST(wants.lat AS float))
         ) as distance
    FROM wants
    WHERE 1 - (${cosineDistance(situations.embedding, embedding)}) > 0.5
    JOIN users ON wants.user_id = users.id
    ORDER BY similarity DESC, distance ASC;
  `;

  return (await db.execute(query)).rows.map((r) => {
    return {
      ...r,
      username: r.name,
      distance: metersToMiles(r.distance as number),
    };
  }) as Request[];
}
