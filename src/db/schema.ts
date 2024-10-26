import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("name").notNull(),
  phone: text("phone").notNull(),
  lon: text("lon").notNull(),
  lat: text("lat").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const wants = pgTable("wants", {
  id: serial("id").primaryKey(),
  first_name: text("name").notNull(),
  resource: text("resource").notNull(),
  address: text("address").notNull(),
  place_name: text("place_name").notNull(),
  lon: text("lon").notNull(),
  lat: text("lat").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
