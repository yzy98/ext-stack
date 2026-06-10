import type { MiddlewareHandler, Next } from "hono";
import { getAuth } from "../lib/auth";
import type { AppContext, AppEnv } from "../types";

export const sessionMiddleware: MiddlewareHandler<AppEnv> = async (
  c: AppContext,
  next: Next
) => {
  const auth = getAuth(c);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("session", null);
    c.set("user", null);
    await next();
    return;
  }

  c.set("session", session.session);
  c.set("user", session.user);
  await next();
};
