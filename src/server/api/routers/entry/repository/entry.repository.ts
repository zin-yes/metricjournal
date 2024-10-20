import { db } from "@/server/database";
import { entriesTable } from "@/server/database/schema/entires";
import { Logger } from "@/utils/logger";
import { eq } from "drizzle-orm";
import { createEntrySchema } from "../entry.input";
import {
  type CreateEntry,
  type CreateResult,
  type DeleteResult,
  type ReadAllResult,
  type ReadResult,
  UpdateEntry,
  type UpdateResult,
} from "./entry.repository.types";

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
      .values(schemaValidatedEntry)
      .returning();

    return result[0];
  }
  // TODO: Add auth
  public async readAll(
    userId: string,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug(`Reading all entries from the database.`);

    const result = await db.query.entriesTable.findMany({
      orderBy: (entry, { desc }) => desc(entry.createdAt),
      limit,
      offset,
    });

    return result;
  }

  public async read(userId: string, id: string): Promise<ReadResult> {
    this.logger.debug(`Reading an entry from the database with id ${id}.`);

    const result = await db.query.entriesTable.findFirst({
      where: eq(entriesTable.id, id),
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
      .where(eq(entriesTable.id, id));

    return result.success;
  }

  public async delete(userId: string, id: string): Promise<DeleteResult> {
    this.logger.debug(`Deleting an entry from the database with id ${id}.`);

    const result = await db.delete(entriesTable).where(eq(entriesTable.id, id));

    return result.success;
  }
}

export const entryRepository = new EntryRepository();
