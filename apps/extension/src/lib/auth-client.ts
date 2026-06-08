import { createAuthClient } from "@ext-stack/auth/client";

export const authClient = createAuthClient(
  import.meta.env.WXT_API_URL ?? "http://localhost:8787"
);
