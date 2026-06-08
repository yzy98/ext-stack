import { createDb } from "@ext-stack/db";
import type { AppContext } from "../types";

export const getDb = (c: AppContext) => createDb(c.env.DB);
