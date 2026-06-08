import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
const token = process.env.CLOUDFLARE_D1_TOKEN;

if (!(accountId && databaseId && token)) {
  throw new Error("Local environment variables are required");
}

export default defineConfig({
  out: "../../apps/server/drizzle/migrations",
  schema: "./src/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  casing: "snake_case",
  dbCredentials: {
    accountId,
    databaseId,
    token,
  },
});
