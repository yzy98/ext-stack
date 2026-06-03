import type { D1Database } from "@cloudflare/workers-types";
import type { Context } from "hono";

export type AppContext = Context<AppEnv>;

export interface AppEnv {
  Bindings: Bindings;
}

export interface Bindings {
  DB: D1Database;
  WEB_BASE_URL: string;
}
