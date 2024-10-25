import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
