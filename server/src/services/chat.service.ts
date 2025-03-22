import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { chats, userChats } from "@/db/schema";

export const getChats = async (user_id: string) => {
  const usrChats = await db
    .select({ chat_id: userChats.chat_id })
    .from(userChats)
    .where(eq(userChats.user_id, user_id));

  const chat_ids = usrChats.map(({ chat_id }) => chat_id);

  return await db.select().from(chats).where(inArray(chats.id, chat_ids));
};

export const createChat = async ({
  name,
  user_id,
}: {
  name: string;
  user_id: string;
}) => {
  const nc = await db
    .insert(chats)
    .values({
      name,
    })
    .returning();

  await db
    .insert(userChats)
    .values({
      user_id,
      chat_id: nc[0].id,
    })
    .run();

  return nc;
};
