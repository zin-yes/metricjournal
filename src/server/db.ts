import { drizzle } from "drizzle-orm/d1";

import * as schema from "@/server/schema";

export const db = drizzle(process.env.DB, {
  schema,
});
