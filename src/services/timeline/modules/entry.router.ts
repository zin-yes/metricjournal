import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createEntrySchema,
  deleteEntrySchema,
  readEntrySchema,
  updateEntrySchema,
  readAllEntrySchema,
} from "./entry.input";
import { entryService } from "./entry.service";

export const entryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createEntrySchema)
    .mutation(async ({ input, ctx }) => {
      return entryService.create(ctx.session.user.id, {
        ...input,
      });
    }),
  readAll: protectedProcedure
    .input(readAllEntrySchema)
    .query(async ({ input, ctx }) => {
      return entryService.readAll(
        ctx.session.user.id,
        input.limit ?? 50,
        input.cursor ?? 0
      );
    }),
  read: protectedProcedure
    .input(readEntrySchema)
    .query(async ({ input, ctx }) => {
      return entryService.read(ctx.session.user.id, input.id);
    }),
  update: protectedProcedure
    .input(updateEntrySchema)
    .mutation(async ({ input, ctx }) => {
      return entryService.update(ctx.session.user.id, input.id, {
        note: input.note ?? null,
        completedAt: input.completedAt ?? null,
        title: input.title,
      });
    }),
  delete: protectedProcedure
    .input(deleteEntrySchema)
    .mutation(async ({ input, ctx }) => {
      return entryService.delete(ctx.session.user.id, input.id);
    }),
});
