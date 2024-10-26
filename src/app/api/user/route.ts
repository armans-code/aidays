import { z } from "zod";
import { db } from "../../../db";
import { wants } from "../../../db/schema";

const bodySchema = z.object({
  first_name: z.string(),
  phone: z.string(),
  address: z.string(),
  resource: z.string(),
});

export async function POST(req: Request) {
  //   TODO: Add webhook verification
  //   const token = req.headers.get("Authorization");
  //   if (!token) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }
  //   try {
  //     const decoded = verify(token, process.env.WEBHOOK_SECRET as string);
  //   } catch (error) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  // save data to db
  const body = await req.json();
  try {
    const res = bodySchema.parse(body);
    await db.insert(wants).values(res);
  } catch (error) {
    return new Response("Bad Request", { status: 400 });
  }
}
