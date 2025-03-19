import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { friendInsertSchema } from "@/db/schema";

export const friendsRoute = new Hono()
  .basePath("/friend")
  .post("/new", zValidator("json", friendInsertSchema), (c) => {
    const { user_id, friend_id } = c.req.valid("json");

    // do the magic!

    return c.json({});
  });
