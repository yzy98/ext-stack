import type { AppType } from "@ext-stack/server";
import { hc } from "hono/client";

export const createApiClient = (apiUrl: string) =>
  hc<AppType>(apiUrl, {
    init: {
      credentials: "include",
    },
  });

export type ApiClient = ReturnType<typeof createApiClient>;
