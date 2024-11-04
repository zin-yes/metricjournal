import { Logger } from "@/utils/logger";
import { entryRepository } from "@/services/timeline/modules/entry.repository";

import {
  type TimelineEntry,
  type TimelineEntryInsert,
} from "@/database/schema";

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

class EntryService {
  private readonly logger = new Logger(EntryService.name);

  public async create(
    userId: string,
    entry: TimelineEntryCreate
  ): Promise<CreateResult> {
    this.logger.debug("Calling repository to create a new Timeline entry.");

    return await entryRepository.create(userId, entry);
  }

  public async readAll(
    userId: string,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug("Calling repository to read all Timeline entries.");

    return await entryRepository.readAll(userId, limit, offset);
  }

  public async read(userId: string, id: string): Promise<ReadResult> {
    this.logger.debug("Calling repository to read a Timeline entry.");

    return await entryRepository.read(userId, id);
  }

  public async update(
    userId: string,
    id: string,
    entry: TimelineEntryUpdate
  ): Promise<UpdateResult> {
    this.logger.debug("Calling repository to update a Timeline entry.");

    return await entryRepository.update(userId, id, entry);
  }

  public async delete(userId: string, id: string): Promise<DeleteResult> {
    this.logger.debug("Calling repository to delete a Timeline entry.");

    return await entryRepository.delete(userId, id);
  }
}

export const entryService = new EntryService();
