import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
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
  create: protectedProcedure
    .input(createEntrySchema)
    .mutation(async ({ input, ctx }) => {
      return entryService.create(ctx, {
        note: input.note ?? null,
        title: input.title,
      });
    }),
  readAll: protectedProcedure
    .input(readAllEntrySchema)
    .query(async ({ input, ctx }) => {
      return entryService.readAll(ctx, input.limit ?? 50, input.cursor ?? 0);
    }),
  readAllFromDay: protectedProcedure
    .input(readAllFromDayEntrySchema)
    .query(async ({ input, ctx }) => {
      return entryService.readAllFromDay(
        ctx,
        input.date,
        input.limit ?? 50,
        input.cursor ?? 0
      );
    }),
  read: protectedProcedure
    .input(readEntrySchema)
    .query(async ({ input, ctx }) => {
      return entryService.read(ctx, input.id);
    }),
  update: protectedProcedure
    .input(updateEntrySchema)
    .mutation(async ({ input, ctx }) => {
      return entryService.update(ctx, input.id, {
        note: input.note ?? null,
        completedAt: input.completedAt ?? null,
        title: input.title,
      });
    }),
  delete: protectedProcedure
    .input(deleteEntrySchema)
    .mutation(async ({ input, ctx }) => {
      return entryService.delete(ctx, input.id);
    }),
});
