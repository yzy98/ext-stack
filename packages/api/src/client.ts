import type { AppType } from "@ext-stack/server";
import { hc } from "hono/client";

export const createApiClient = (apiUrl: string) => hc<AppType>(apiUrl);

export type ApiClient = ReturnType<typeof createApiClient>;
