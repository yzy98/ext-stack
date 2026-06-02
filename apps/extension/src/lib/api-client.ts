import { createApiClient } from "@ext-stack/api/client";

export const apiClient = createApiClient(
  import.meta.env.WXT_API_URL ?? "http://localhost:8787"
);
