import { drizzle } from "drizzle-orm/d1";

import * as entriesSchema from "./schema/entires";

export const db = drizzle(process.env.DB, { schema: { ...entriesSchema } });
