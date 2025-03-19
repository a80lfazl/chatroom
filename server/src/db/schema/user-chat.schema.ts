import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth.schema";
import { chats } from "./chats.schema";

export const userChats = sqliteTable(
  "user_chats",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => user.id),
    chat_id: text("chat_id")
      .notNull()
      .references(() => chats.id),
  },
  (table) => [primaryKey({ columns: [table.chat_id, table.user_id] })]
);
