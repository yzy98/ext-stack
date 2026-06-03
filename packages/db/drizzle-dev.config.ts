import { defineConfig } from "drizzle-kit";

const localD1Path = process.env.LOCAL_D1_DB_PATH;

if (!localD1Path) {
  throw new Error("LOCAL_D1_DB_PATH is required");
}

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:${localD1Path}`,
  },
});
