import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  createEntrySchema,
  deleteEntrySchema,
  readEntrySchema,
  updateEntrySchema,
  readAllEntrySchema,
  readAllFromDayEntrySchema,
} from "./entry.input";
import { entryService } from "./service/entry.service";

export const entryRouter = createTRPCRouter({
  // TODO: Add auth
  create: publicProcedure
    .input(createEntrySchema)
    .mutation(async ({ input }) => {
      return entryService.create({
        note: input.note ?? null,
        title: input.title,
      });
    }),
  readAll: publicProcedure
    .input(readAllEntrySchema)
    .query(async ({ input }) => {
      return entryService.readAll(input.limit ?? 50, input.cursor ?? 0);
    }),
  readAllFromDay: publicProcedure
    .input(readAllFromDayEntrySchema)
    .query(async ({ input }) => {
      return entryService.readAllFromDay(
        input.date,
        input.limit ?? 50,
        input.cursor ?? 0
      );
    }),
  read: publicProcedure.input(readEntrySchema).query(async ({ input }) => {
    return entryService.read(input.id);
  }),
  update: publicProcedure
    .input(updateEntrySchema)
    .mutation(async ({ input }) => {
      return entryService.update(input.id, {
        note: input.note ?? null,
        completedAt: input.completedAt ?? null,
        title: input.title,
      });
    }),
  delete: publicProcedure
    .input(deleteEntrySchema)
    .mutation(async ({ input }) => {
      return entryService.delete(input.id);
    }),
});
