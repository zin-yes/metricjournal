import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/database/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_TURSO_URL,
    authToken: env.DATABASE_TURSO_AUTH_TOKEN,
  },
} satisfies Config;
