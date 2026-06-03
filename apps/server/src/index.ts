import { createDb } from "@ext-stack/db";
import { usersTable } from "@ext-stack/db/schema";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AppContext, AppEnv } from "./types";

const app = new Hono<AppEnv>();

app.use(
  "*",
  cors({
    origin: (origin, c) => {
      const allowedOrigin = (c as AppContext).env.WEB_BASE_URL;
      return origin === allowedOrigin ? origin : null;
    },
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

const routes = app
  .get("/health", (c) =>
    c.json({
      ok: true,
      service: "server",
    })
  )
  .get("/health/db", async (c) => {
    const db = createDb(c.env.DB);
    const result = await db.select().from(usersTable);
    return c.json(result);
  });

export default app;

export type AppType = typeof routes;
