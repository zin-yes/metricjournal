import { Logger } from "@/utils/logger";
import { entryRepository } from "../repository/entry.repository";
import {
  type CreateEntry,
  type CreateResult,
  type DeleteResult,
  type ReadAllResult,
  type ReadResult,
  UpdateEntry,
  type UpdateResult
} from "./entry.service.types";

class EntryService {
  private readonly logger = new Logger(EntryService.name);

  public async create(entry: CreateEntry): Promise<CreateResult> {
    this.logger.debug("Creating a new entry in the database.");

    // TODO: Add auth
    const userId = "";


    return await entryRepository.create(userId, entry);
  }
  // TODO: Add auth
  public async readAll(): Promise<ReadAllResult> {
    this.logger.debug(`Reading all entries from the database.`);
    // TODO: Add auth
    const userId = "";
    return await entryRepository.readAll(userId, 50, 0);
  }

  public async read(id: string): Promise<ReadResult> {
    this.logger.debug(`Reading an entry from the database with id ${id}.`);
    // TODO: Add auth
    const userId = "";
    return await entryRepository.read(userId, id);
  }

  public async update(id: string, entry: UpdateEntry): Promise<UpdateResult> {
    this.logger.debug(`Updating an entry from the database with id ${id}.`);
    // TODO: Add auth
    const userId = "";
    return await entryRepository.update(userId, id, entry);
  }

  public async delete(id: string): Promise<DeleteResult> {
    this.logger.debug(`Deleting an entry from the database with id ${id}.`);
    // TODO: Add auth
    const userId = "";
    return await entryRepository.delete(userId, id);
  }
}

export const entryService = new EntryService();
