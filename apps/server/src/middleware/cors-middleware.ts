import { cors } from "hono/cors";
import type { AppContext } from "../types";

export const corsMiddleware = cors({
  origin: (origin, c) => {
    const allowedOrigin = (c as AppContext).env.WEB_BASE_URL;
    return origin === allowedOrigin ? origin : null;
  },
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});
