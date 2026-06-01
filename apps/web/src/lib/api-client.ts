import { createApiClient } from "@ext-stack/api/client";

export const apiClient = createApiClient(
  import.meta.env.VITE_API_URL ?? "http://localhost:8787"
);
