import { type Entry as _Entry } from "@/server/database/schema/entires";
import { type EntryTag as _EntryTag } from "@/server/database/schema/entires";

export type Entry = _Entry;
export type EntryTag = _EntryTag;

export type CreateEntry = Omit<
  Entry,
  "id" | "completedAt" | "createdAt" | "updatedAt"
>;
export type UpdateEntry = Omit<Entry, "id" | "createdAt" | "updatedAt">;

export type CreateResult = Entry | undefined;
export type ReadAllResult = Entry[];
export type ReadResult = Entry | undefined;
export type UpdateResult = boolean;
export type DeleteResult = boolean;
