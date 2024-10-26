import { z } from "zod";
import { db } from "../../../db";
import { situations } from "../../../db/schema";
import { getPlaces } from "../../../lib/places";
import { classifySeverity } from "@/lib/severity";

const bodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  situation: z.string(),
});

// TODO: add rate limiting with KV

export async function POST(req: Request) {
  // TODO: Add webhook verification

  const body = await req.json();
  try {
    const res = bodySchema.parse(body);
    const places = await getPlaces(res.address);
    const place = places[0];

    const severity = await classifySeverity(res.situation)

    try {
      await db.insert(situations).values({
        ...res,
        lat: place.location?.lat.toString() ?? "",
        lon: place.location?.lng.toString() ?? "",
        place_name: place.name ?? "",
        address: place.address ?? "",
        situation: res.situation,
        severity: severity,
        phone: res.phone,
        name: res.name
      });
    } catch (error) {
      console.log(error);
      return new Response("Internal Server Error", { status: 500 });
    }
    return new Response("OK", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Bad Request", { status: 400 });
  }
}
