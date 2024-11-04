import { type ProjectEntry, type ProjectEntryInsert } from "@/database/schema";
import { Logger } from "@/utils/logger";
import { and, eq } from "drizzle-orm";
import { projectEntry as projectEntryTable } from "@/database/schema";
import { db } from "@/database";
import { createProjectEntrySchema } from "@/services/project/modules/entry.input";

type ProjectEntryUpdate = Omit<
  ProjectEntry,
  "id" | "userId" | "createdAt" | "updatedAt" | "tags" | "projectId"
>;

type CreateResult = ProjectEntry;
type ReadAllResult = ProjectEntry[];
type ReadResult = ProjectEntry;
type UpdateResult = ProjectEntry;
type DeleteResult = ProjectEntry;

type ProjectEntryCreate = Omit<ProjectEntryInsert, "userId" | "id">;

class ProjectEntryRepository {
  private readonly logger = new Logger(ProjectEntryRepository.name);

  public async create(
    userId: string,
    projectId: string,
    projectEntry: ProjectEntryCreate
  ): Promise<CreateResult> {
    this.logger.debug("Creating a new entry in the database.");

    const schemaValidatedEntry = createProjectEntrySchema.parse(projectEntry);

    const result = await db
      .insert(projectEntryTable)
      .values({ ...schemaValidatedEntry, projectId, userId })
      .returning();

    if (result.length === 0) {
      this.logger.error(
        "Attempted to insert a new Project entry into the database, but no rows were returned."
      );
      throw new Error("Failed to create entry.");
    }

    this.logger.debug(
      `Made database call without errors; insert function returned ${result.length} results.`
    );

    return result[0];
  }

  public async readAll(
    userId: string,
    projectId: string,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug(`Reading all Project entries from the database.`);

    const result = await db.query.projectEntry.findMany({
      where: and(
        eq(projectEntryTable.userId, userId),
        eq(projectEntryTable.projectId, projectId)
      ),
      orderBy: (projectEntry, { desc }) => desc(projectEntry.createdAt),
      limit,
      offset,
    });

    this.logger.debug(
      `Made database call without errors; findMany function returned ${result.length} results.`
    );

    return result;
  }

  public async read(
    userId: string,
    projectId: string,
    id: string
  ): Promise<ReadResult> {
    this.logger.debug(
      `Reading a Project entry from the database with id ${id}.`
    );

    const result = await db.query.projectEntry.findFirst({
      where: and(
        eq(projectEntryTable.id, id),
        eq(projectEntryTable.userId, userId),
        eq(projectEntryTable.projectId, projectId)
      ),
    });

    if (!result) {
      const errorMessage = `Attempted to read a Project entry from the database with id ${id}, but no row was returned.`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this.logger.debug(
      `Made database call without errors; read function returned a result successfully.`
    );

    return result;
  }

  public async update(
    userId: string,
    projectId: string,
    id: string,
    projectEntry: ProjectEntryUpdate
  ): Promise<UpdateResult> {
    this.logger.debug(`Updating an entry from the database with id ${id}.`);

    const result = await db
      .update(projectEntryTable)
      .set(projectEntry)
      .where(
        and(
          eq(projectEntryTable.id, id),
          eq(projectEntryTable.userId, userId),
          eq(projectEntryTable.projectId, projectId)
        )
      )
      .returning();

    this.logger.debug(
      `Made database call without errors; update function returned ${result.length} results.`
    );

    return result[0];
  }

  public async delete(
    userId: string,
    projectId: string,
    id: string
  ): Promise<DeleteResult> {
    this.logger.debug(
      `Deleting a Project entry from the database with id ${id}.`
    );

    const result = await db
      .delete(projectEntryTable)
      .where(
        and(
          eq(projectEntryTable.id, id),
          eq(projectEntryTable.userId, userId),
          eq(projectEntryTable.projectId, projectId)
        )
      )
      .returning();

    this.logger.debug(
      `Made database call without errors; delete function returned ${result.length} results.`
    );

    return result[0];
  }
}

export const projectEntryRepository = new ProjectEntryRepository();
