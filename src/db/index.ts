import { drizzle } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";
import * as schema from "./schema";

config({ path: ".env.local" }); // or .env

export const db = drizzle({ schema });
