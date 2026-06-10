import { Hono } from "hono";
import { getAuth } from "./lib/auth";
import { corsMiddleware } from "./middleware/cors-middleware";
import { sessionMiddleware } from "./middleware/session-middleware";
import health from "./routes/health";
import setting from "./routes/setting";
import type { AppEnv } from "./types";

const app = new Hono<AppEnv>();

// Middlewares
app.use("*", corsMiddleware);
app.use("/setting/*", sessionMiddleware);

// Auth route
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = getAuth(c);
  return auth.handler(c.req.raw);
});

const routes = app.route("/health", health).route("/setting", setting);

export default app;

export type AppType = typeof routes;
