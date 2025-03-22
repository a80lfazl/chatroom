import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { chatInsertSchema } from "@/db/schema";
import { getChats, createChat } from "@/services/chat.service";

import { ENV } from "..";

export const chatRoute = new Hono<ENV>()
  .basePath("/chat")
  .get("/", async (c) => {
    const { id } = c.get("user")!;

    const chats = await getChats(id);

    return c.json({ chats });
  })
  .post("/", zValidator("json", chatInsertSchema), async (c) => {
    const { name } = c.req.valid("json");
    const { id } = c.get("user")!;

    const [newChat] = await createChat({ name, user_id: id });

    return c.json({ chat: newChat }, 201);
  });
