import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { messageInsertSchema, user } from "@/db/schema";

import { ENV } from "..";

export const messagesRoute = new Hono<ENV>()
  .basePath("/message")
  .post("/", zValidator("json", messageInsertSchema), async (c) => {
    const { chat_id, content } = c.req.valid("json");
    const { id: sender_id } = c.get("user")!;

    const u = await db.query.user.findFirst({
      where: eq(user.id, sender_id),
    });
    // do the magic!

    return c.json({ chat_id, u, content });
  });
