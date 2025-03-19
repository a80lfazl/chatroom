import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { user } from "./auth.schema";

export type FriendShipStatus = "pending" | "accepted" | "blocked";

export const friends = sqliteTable(
  "friends",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    user_id: integer()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // the user initiated friend request
    friend_id: integer()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // the user who is friended
    status: text({ mode: "text", enum: ["pending", "accepted", "blocked"] })
      .$type<FriendShipStatus>()
      .notNull()
      .default("pending"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(new Date()),
  },
  (table) => [
    index("friends_user_id_idx").on(table.user_id),
    index("friends_friend_id_idx").on(table.friend_id),
    index("friends_status_idx").on(table.status),
    index("friends_composite_idx").on(table.user_id, table.friend_id),
  ]
);

export const friendInsertSchema = createInsertSchema(friends);
export const friendUpdateSchema = createUpdateSchema(friends);
