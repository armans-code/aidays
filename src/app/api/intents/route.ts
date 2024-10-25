import { verify } from "jsonwebtoken";

export async function POST(req: Request) {
  // Verify webhook
  const token = req.headers["Authorization"] as string;
  try {
    const decoded = verify(token, process.env.WEBHOOK_SECRET);
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  // save data to db

  return new Response("OK", { status: 200 });
}
