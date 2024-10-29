import { Logger } from "@/utils/logger";
import { entryRepository } from "../repository/entry.repository";
import {
  type CreateEntry,
  type CreateResult,
  type DeleteResult,
  ReadAllFromDayResult,
  type ReadAllResult,
  type ReadResult,
  UpdateEntry,
  type UpdateResult,
} from "./entry.service.types";
import { auth } from "@/lib/auth";
import { authService } from "../../auth/service/auth.service";
import { TRPCContext } from "@/server/api/trpc";

class EntryService {
  private readonly logger = new Logger(EntryService.name);

  public async create(
    context: TRPCContext,
    entry: CreateEntry
  ): Promise<CreateResult> {
    this.logger.debug("Creating a new entry in the database.");

    const user = context.session?.user;

    if (!user) {
      throw new Error("UNAUTHORIZED");
    }

    return await entryRepository.create(user.id, entry);
  }

  public async readAll(
    context: TRPCContext,
    limit: number,
    offset: number
  ): Promise<ReadAllResult> {
    this.logger.debug(`Reading all entries from the database.`);

    const user = context.session?.user;

    if (!user) {
      throw new Error("UNAUTHORIZED");
    }

    return await entryRepository.readAll(user.id, limit, offset);
  }

  public async readAllFromDay(
    context: TRPCContext,
    date: Date,
    limit: number,
    offset: number
  ): Promise<ReadAllFromDayResult> {
    this.logger.debug(`Reading all entries from the database for a day.`);

    const user = context.session?.user;

    if (!user) {
      throw new Error("UNAUTHORIZED");
    }

    return await entryRepository.readAllFromDay(user.id, date, limit, offset);
  }

  public async read(context: TRPCContext, id: string): Promise<ReadResult> {
    this.logger.debug(`Reading an entry from the database with id ${id}.`);

    const user = context.session?.user;

    if (!user) {
      throw new Error("UNAUTHORIZED");
    }

    return await entryRepository.read(user.id, id);
  }

  public async update(
    context: TRPCContext,
    id: string,
    entry: UpdateEntry
  ): Promise<UpdateResult> {
    this.logger.debug(`Updating an entry from the database with id ${id}.`);

    const user = context.session?.user;

    if (!user) {
      throw new Error("UNAUTHORIZED");
    }

    return await entryRepository.update(user.id, id, entry);
  }

  public async delete(context: TRPCContext, id: string): Promise<DeleteResult> {
    this.logger.debug(`Deleting an entry from the database with id ${id}.`);

    const user = context.session?.user;

    if (!user) {
      throw new Error("UNAUTHORIZED");
    }

    return await entryRepository.delete(user.id, id);
  }
}

export const entryService = new EntryService();
