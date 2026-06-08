import type { Db } from "@ext-stack/db";
import { account, session, user, verification } from "@ext-stack/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export interface CreateAuthOptions {
  baseURL: string;
  secret: string;
  trustedOrigins: string[];
}

export const createAuth = (db: Db, options: CreateAuthOptions) =>
  betterAuth({
    baseURL: options.baseURL,
    secret: options.secret,
    trustedOrigins: options.trustedOrigins,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        user,
        account,
        session,
        verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
  });

export type Auth = ReturnType<typeof createAuth>;
