import { createAuth } from "@ext-stack/auth";
import type { AppContext } from "../types";
import { getDb } from "./db";

export const getAuth = (c: AppContext) =>
  createAuth(getDb(c), {
    baseURL: c.env.API_BASE_URL,
    secret: c.env.BETTER_AUTH_SECRET,
    trustedOrigins: [c.env.WEB_BASE_URL, c.env.CHROME_EXTENSION_ID],
  });
