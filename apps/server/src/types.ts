import type { Context } from "hono";

export type AppContext = Context<AppEnv>;

export interface AppEnv {
  Bindings: Bindings;
}

export interface Bindings {
  WEB_BASE_URL: string;
}
