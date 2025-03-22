import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./auth.schema";

export const chats = sqliteTable("chats", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey(),
  chat_id: text("chat_id")
    .notNull()
    .references(() => chats.id),
  sender_id: text("sender_id")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const chatInsertSchema = createInsertSchema(chats, {
  name: (s) => s.min(3).max(30),
});

export const messageInsertSchema = createInsertSchema(messages, {
  content: (s) => s.max(500),
  sender_id: (s) => s.nullish(),
});
