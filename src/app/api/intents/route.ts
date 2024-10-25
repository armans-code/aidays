import { verify } from "jsonwebtoken";

export async function POST(req: Request) {
  // Verify webhook
  const token = req.headers.get("Authorization");
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.WEBHOOK_SECRET as string);
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  // save data to db

  return new Response("OK", { status: 200 });
}
