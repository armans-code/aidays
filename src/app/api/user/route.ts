import { z } from "zod";
import { db } from "../../../db";
import { wants } from "../../../db/schema";

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
    try {
      await db.insert(wants).values(res);
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
    return new Response("OK", { status: 201 });
  } catch (error) {
    return new Response("Bad Request", { status: 400 });
  }

  // i need to learn effect :(
}
