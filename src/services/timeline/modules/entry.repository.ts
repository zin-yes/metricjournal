import { Logger } from "@/utils/logger";
import { and, eq, gte, lte } from "drizzle-orm";
import { createEntrySchema } from "./entry.input";

import {
  type TimelineEntry,
  type TimelineEntryInsert,
  timelineEntry as timelineEntryTable,
} from "@/database/schema";
import { db } from "@/database";

type TimelineEntryCreate = Omit<
  TimelineEntryInsert,
  "userId" | "id" | "createdAt" | "updatedAt"
>;
type TimelineEntryUpdate = Omit<
  TimelineEntryInsert,
  "userId" | "id" | "createdAt" | "updatedAt"
>;

type CreateResult = TimelineEntry;
type ReadAllResult = TimelineEntry[];
type ReadResult = TimelineEntry;
type UpdateResult = TimelineEntry;
type DeleteResult = TimelineEntry;

class EntryRepository {
  private readonly logger = new Logger(EntryRepository.name);

  public async create(
    userId: string,
    entry: TimelineEntryCreate
  ): Promise<CreateResult> {
    this.logger.debug("Creating a new entry in the database.");

    const schemaValidatedEntry = createEntrySchema.parse(entry);

    const result = await db
      .insert(timelineEntryTable)
      .values({ ...schemaValidatedEntry, userId })
      .returning();

    return result[0];
  }

  // private getStartOfDay(date: Date): Date {
  //   return new Date(date.setHours(0, 0, 0, 0));
  // }

  // private getEndOfDay(date: Date): Date {
  //   return new Date(date.setHours(23, 59, 59, 999));
  // }

  // public async readAllFromDay(
  //   userId: string,
  //   date: Date,
  //   limit: number,
  //   offset: number
  // ): Promise<ReadAllFromDayResult> {
  //   this.logger.debug(`Reading all entries from the database for a day.`);

  //   const result = await db.query.entry.findMany({
  //     where: and(
  //       eq(timelineEntryTable.userId, userId),
  //       and(
  //         lte(timelineEntryTable.createdAt, this.getEndOfDay(date)),
  //         gte(timelineEntryTable.createdAt, this.getStartOfDay(date))
  //       )
  //     ),
  //     orderBy: (entry, { desc }) => desc(entry.createdAt),
  //     limit,
  //     offset,
  //   });

  //   return result;
  // }

  public async readAll(
    userId: string,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug(`Reading all entries from the database.`);

    const result = await db.query.timelineEntry.findMany({
      where: eq(timelineEntryTable.userId, userId),
      orderBy: (entry, { desc }) => desc(entry.createdAt),
      limit,
      offset,
    });

    return result;
  }

  public async read(userId: string, id: string): Promise<ReadResult> {
    this.logger.debug(`Reading an entry from the database with id ${id}.`);

    const result = await db.query.timelineEntry.findFirst({
      where: and(
        eq(timelineEntryTable.id, id),
        eq(timelineEntryTable.userId, userId)
      ),
    });

    if (!result) {
      const errorMessage = `Attempted to read a Journal entry from the database with id ${id}, but no row was returned.`;
      this.logger.debug(errorMessage);
      throw new Error(errorMessage);
    }

    return result;
  }

  public async update(
    userId: string,
    id: string,
    entry: TimelineEntryUpdate
  ): Promise<UpdateResult> {
    this.logger.debug(`Updating an entry from the database with id ${id}.`);

    const result = await db
      .update(timelineEntryTable)
      .set(entry)
      .where(
        and(
          eq(timelineEntryTable.id, id),
          eq(timelineEntryTable.userId, userId)
        )
      )
      .returning();

    return result[0];
  }

  public async delete(userId: string, id: string): Promise<DeleteResult> {
    this.logger.debug(`Deleting an entry from the database with id ${id}.`);

    const result = await db
      .delete(timelineEntryTable)
      .where(
        and(
          eq(timelineEntryTable.id, id),
          eq(timelineEntryTable.userId, userId)
        )
      )
      .returning();

    return result[0];
  }
}

export const entryRepository = new EntryRepository();
