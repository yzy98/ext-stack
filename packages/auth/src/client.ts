import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export const createAuthClient = (baseURL: string) =>
  createBetterAuthClient({
    baseURL,
  });

export type AuthClient = ReturnType<typeof createAuthClient>;
