/** biome-ignore-all lint/performance/noNamespaceImport: ignore */
/** biome-ignore-all lint/performance/noBarrelFile: ignore */
import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function createDb(database: D1Database) {
  return drizzle(database, {
    schema,
  });
}

export type Db = ReturnType<typeof createDb>;
export * from "./schema";
