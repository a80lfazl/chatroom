import { createMiddleware } from "hono/factory";

import type { ENV } from "../index";

export const protectRoute = createMiddleware<ENV>(async (c, next) => {
  const user = c.get("user");

  if (!user) return c.json({ error: "Unauthorized" }, 401);

  return next();
});
