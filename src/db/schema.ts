import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("name").notNull(),
  phone: text("phone").notNull(),
  lon: text("lon").notNull(),
  lat: text("lat").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const situations = pgTable("situations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  situation: text("resource").notNull(),
  severity: integer("severity").notNull(),
  address: text("address").notNull(),
  place_name: text("place_name").notNull(),
  lon: text("lon").notNull(),
  lat: text("lat").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
