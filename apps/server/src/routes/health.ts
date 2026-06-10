import { Hono } from "hono";
import type { AppEnv } from "../types";

const app = new Hono<AppEnv>().get("/", (c) =>
  c.json({
    ok: true,
    service: "server",
  })
);

export default app;
