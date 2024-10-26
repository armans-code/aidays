import { z } from "zod";
import { db } from "../../../db";
import { wants } from "../../../db/schema";
import { getPlaces } from "../../../lib/utils";

const bodySchema = z.object({
  first_name: z.string(),
  phone: z.string(),
  address: z.string(),
  resource: z.string(),
});

// TODO: add rate limiting with KV

export async function POST(req: Request) {
  // TODO: Add webhook verification

  const body = await req.json();
  try {
    const res = bodySchema.parse(body);
    const places = await getPlaces(res.address);
    const place = places[0];

    try {
      await db.insert(wants).values({
        ...res,
        lat: place.location?.lat.toString() ?? "",
        lon: place.location?.lng.toString() ?? "",
        place_name: place.name ?? "",
        address: place.address ?? "",
      });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
    return new Response("OK", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Bad Request", { status: 400 });
  }
}
