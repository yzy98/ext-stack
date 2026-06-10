import { eq } from "@ext-stack/db/helper";
import { userSetting } from "@ext-stack/db/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getDb } from "../lib/db";
import type { AppEnv } from "../types";

const patchUserSettingSchema = z
  .object({
    preferredModel: z.string().optional(),
    extensionEnabled: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one setting must be provided",
  });

const patchUserSettingValidator = zValidator(
  "json",
  patchUserSettingSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ error: "Invalid request body" }, 400);
    }
  }
);

const app = new Hono<AppEnv>()
  .get("/", async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = getDb(c);

    const [setting] = await db
      .select()
      .from(userSetting)
      .where(eq(userSetting.userId, user.id));

    if (setting) {
      return c.json(setting);
    }

    // Not existing, insert a simple new user setting
    const created = await db
      .insert(userSetting)
      .values({
        userId: user.id,
      })
      .returning()
      .get();

    return c.json(created);
  })
  .patch("/", patchUserSettingValidator, async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = getDb(c);
    const { extensionEnabled, preferredModel } = c.req.valid("json");
    const patch = {
      ...(extensionEnabled === undefined ? {} : { extensionEnabled }),
      ...(preferredModel === undefined ? {} : { preferredModel }),
    };

    const setting = await db
      .insert(userSetting)
      .values({
        userId: user.id,
        ...patch,
      })
      .onConflictDoUpdate({
        target: userSetting.userId,
        set: patch,
      })
      .returning()
      .get();

    return c.json(setting);
  });

export default app;
