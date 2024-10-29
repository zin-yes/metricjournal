import { type Entry as _Entry } from "@/database/schema";

export type Entry = _Entry;

export type CreateEntry = Omit<
  Entry,
  "id" | "userId" | "completedAt" | "createdAt" | "updatedAt"
>;
export type UpdateEntry = Omit<
  Entry,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type CreateResult = Entry | undefined;
export type ReadAllResult = Entry[];
export type ReadAllFromDayResult = Entry[];
export type ReadResult = Entry | undefined;
export type UpdateResult = Entry | undefined;
export type DeleteResult = Entry | undefined;
