import { drizzle } from "drizzle-orm/d1";

import DRIZZLE_SCHEMA from "@/server/database/schema";

export const db = drizzle(process.env.DB, { schema: { ...DRIZZLE_SCHEMA } });
