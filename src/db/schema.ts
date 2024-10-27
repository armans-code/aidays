import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  vector,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_id: text("clerk_id").notNull(),
  address: text("address").notNull(),
  place_id: text("place_id").notNull(),
  username: text("username").notNull(),
  phone: text("phone").notNull(),
  lon: text("lon").notNull(),
  lat: text("lat").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const wants = pgTable(
  "wants",
  {
    id: serial("id").primaryKey(),
    description: text("description").notNull(),
    address: text("address").notNull(),
    place_id: text("place_id").notNull(),
    severity: integer("severity").notNull(),
    lon: text("lon").notNull(),
    lat: text("lat").notNull(),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    embedding: vector("embedding", { dimensions: 768 }),
  },
  (table) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export const usersRelation = relations(users, ({ many }) => ({
  wants: many(wants),
}));

export const situations = pgTable(
  "situations",
  {
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
    embedding: vector("embedding", { dimensions: 768 }),
  },
  (table) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export type Situation = typeof situations.$inferSelect;
