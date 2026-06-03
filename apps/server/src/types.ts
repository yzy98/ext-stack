import type { D1Database } from "@cloudflare/workers-types";
import type { Context } from "hono";
import type { getAuth } from "./lib/auth";

export type AppContext = Context<AppEnv>;

export interface AppEnv {
  Bindings: Bindings;
  Variables: Variables;
}

export interface Bindings {
  API_BASE_URL: string;
  BETTER_AUTH_SECRET: string;
  DB: D1Database;
  WEB_BASE_URL: string;
}

export interface Variables {
  session: Session | null;
  user: User | null;
}

export type AuthInstance = Awaited<ReturnType<typeof getAuth>>;
export type User = AuthInstance["$Infer"]["Session"]["user"];
export type Session = AuthInstance["$Infer"]["Session"]["session"];
