import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

import path from "node:path";

import { showRoutes } from "hono/dev";

import { auth } from "@/lib/auth";
import { protectRoute } from "./middlewares/protect-route";
import { friendsRoute } from "./routes/friends.route";

export type ENV = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const app = new Hono<ENV>();

const webPath = path.resolve("../frontend/web/dist/");
console.log("Web App Path:", webPath);

app.use("*", serveStatic({ root: webPath }));

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Get session and user from db, set them to context
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

// set handler for better auth
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// --- un-Protected Routes --- ///

// This is a test route for un-authenticated users
app.get("/api/hello", async (c) => {
  return c.json({
    message: "Hello!",
  });
});

// --- Protected Routes --- ///
app.use("/api/*", protectRoute);

app.route("/api", friendsRoute);

// Serve the root web file for fallback
app.get("*", (c) => {
  return c.html(Bun.file(webPath + "/index.html").text());
});

// development helper code
showRoutes(app);

export default app;
