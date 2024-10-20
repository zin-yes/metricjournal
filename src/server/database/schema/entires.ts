import { generateUUID } from "@/utils/uuid";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entriesTable = sqliteTable("entries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  title: text("title", { length: 256 }).notNull(),
  note: text("note", { length: 4096 }).notNull(),
  tags: text("tags").$type<EntryTag[]>().default([]),
  completedAt: integer("completed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export type Entry = typeof entriesTable.$inferSelect;
export interface EntryTag {
  id: string;
  name: string;
}
