import { Logger } from "@/utils/logger";
import { and, eq, gte, lte } from "drizzle-orm";
import { createEntrySchema } from "../entry.input";
import {
  type CreateEntry,
  type CreateResult,
  type DeleteResult,
  type ReadAllFromDayResult,
  type ReadAllResult,
  type ReadResult,
  type UpdateEntry,
  type UpdateResult,
} from "./entry.repository.types";
import { entry as entriesTable } from "@/database/schema";
import { db } from "@/database";
import { TRPCContext } from "../../trpc";

class EntryRepository {
  private readonly logger = new Logger(EntryRepository.name);

  public async create(
    userId: string,
    entry: CreateEntry
  ): Promise<CreateResult> {
    this.logger.debug("Creating a new entry in the database.");

    const schemaValidatedEntry = createEntrySchema.parse(entry);

    const result = await db
      .insert(entriesTable)
      .values({ ...schemaValidatedEntry, userId })
      .returning();

    return result[0];
  }

  private getStartOfDay(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  private getEndOfDay(date: Date): Date {
    return new Date(date.setHours(23, 59, 59, 999));
  }

  public async readAllFromDay(
    userId: string,
    date: Date,
    limit: number,
    offset: number
  ): Promise<ReadAllFromDayResult> {
    this.logger.debug(`Reading all entries from the database for a day.`);

    const result = await db.query.entry.findMany({
      where: and(
        eq(entriesTable.userId, userId),
        and(
          lte(entriesTable.createdAt, this.getEndOfDay(date)),
          gte(entriesTable.createdAt, this.getStartOfDay(date))
        )
      ),
      orderBy: (entry, { desc }) => desc(entry.createdAt),
      limit,
      offset,
    });

    return result;
  }

  public async readAll(
    userId: string,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug(`Reading all entries from the database.`);

    const result = await db.query.entry.findMany({
      where: eq(entriesTable.userId, userId),
      orderBy: (entry, { desc }) => desc(entry.createdAt),
      limit,
      offset,
    });

    return result;
  }

  public async read(userId: string, id: string): Promise<ReadResult> {
    this.logger.debug(`Reading an entry from the database with id ${id}.`);

    const result = await db.query.entry.findFirst({
      where: and(eq(entriesTable.id, id), eq(entriesTable.userId, userId)),
    });

    return result;
  }

  public async update(
    userId: string,
    id: string,
    entry: UpdateEntry
  ): Promise<UpdateResult> {
    this.logger.debug(`Updating an entry from the database with id ${id}.`);

    const result = await db
      .update(entriesTable)
      .set(entry)
      .where(and(eq(entriesTable.id, id), eq(entriesTable.userId, userId)))
      .returning();

    return result[0];
  }

  public async delete(userId: string, id: string): Promise<DeleteResult> {
    this.logger.debug(`Deleting an entry from the database with id ${id}.`);

    const result = await db
      .delete(entriesTable)
      .where(and(eq(entriesTable.id, id), eq(entriesTable.userId, userId)))
      .returning();

    return result[0];
  }
}

export const entryRepository = new EntryRepository();
