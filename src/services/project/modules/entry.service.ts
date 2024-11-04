import { ProjectEntry, ProjectEntryInsert } from "@/database/schema";
import { projectEntryRepository } from "@/services/project/modules/entry.repository";
import { Logger } from "@/utils/logger";

type CreateResult = ProjectEntry | undefined;
type ProjectEntryCreate = Omit<
  ProjectEntryInsert,
  "userId" | "id" | "createdAt" | "updatedAt"
>;
type ProjectEntryUpdate = Omit<
  ProjectEntry,
  "id" | "userId" | "createdAt" | "updatedAt" | "tags" | "projectId"
>;

type ReadAllResult = ProjectEntry[];
type ReadResult = ProjectEntry | undefined;
type UpdateResult = ProjectEntry | undefined;
type DeleteResult = ProjectEntry | undefined;

class ProjectEntryService {
  private readonly logger = new Logger(ProjectEntryService.name);

  public async create(
    userId: string,
    projectId: string,
    projectEntry: ProjectEntryCreate
  ): Promise<CreateResult> {
    this.logger.debug("Calling repository to create a new Project entry.");

    try {
      return await projectEntryRepository.create(userId, projectId, {
        ...projectEntry,
      });
      // TODO: Review this and probably redo the error handling mechanisms in all the services.
    } catch (error) {
      return undefined;
    }
  }

  public async readAll(
    userId: string,
    projectId: string,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug("Calling repository to read all Project entries.");

    try {
      return await projectEntryRepository.readAll(
        userId,
        projectId,
        limit,
        offset
      );
    } catch (error) {
      return [];
    }
  }

  public async read(
    userId: string,
    projectId: string,
    id: string
  ): Promise<ReadResult> {
    this.logger.debug("Calling repository to read a Project entry.");

    try {
      return await projectEntryRepository.read(userId, projectId, id);
    } catch (error) {
      return undefined;
    }
  }

  public async update(
    userId: string,
    projectId: string,
    id: string,
    projectEntry: ProjectEntryUpdate
  ): Promise<UpdateResult> {
    this.logger.debug("Calling repository to update a Project entry.");

    try {
      return await projectEntryRepository.update(userId, projectId, id, {
        ...projectEntry,
      });
    } catch (error) {
      return undefined;
    }
  }

  public async delete(
    userId: string,
    projectId: string,
    id: string
  ): Promise<DeleteResult> {
    this.logger.debug("Calling repository to delete a Project entry.");

    try {
      return await projectEntryRepository.delete(userId, projectId, id);
    } catch (error) {
      return undefined;
    }
  }
}

export const projectEntryService = new ProjectEntryService();
