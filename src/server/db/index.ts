import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "@/server/db/schema";

export const db = drizzle(process.env.DB, { schema });
