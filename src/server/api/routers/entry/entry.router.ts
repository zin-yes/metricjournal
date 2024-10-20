import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  createEntrySchema,
  deleteEntrySchema,
  readEntrySchema,
  updateEntrySchema,
} from "./entry.input";
import { entryService } from "./service/entry.service";

export const entryRouter = createTRPCRouter({
  // TODO: Add auth
  create: publicProcedure
    .input(createEntrySchema)
    .mutation(async ({ ctx, input }) => {
      return entryService.create(input);
    }),
  readAll: publicProcedure.query(async ({ ctx }) => {
    return entryService.readAll();
  }),
  read: publicProcedure.input(readEntrySchema).query(async ({ ctx, input }) => {
    return entryService.read(input.id);
  }),
  update: publicProcedure
    .input(updateEntrySchema)
    .mutation(async ({ ctx, input }) => {
      return entryService.update(input.id, input);
    }),
  delete: publicProcedure
    .input(deleteEntrySchema)
    .mutation(async ({ ctx, input }) => {
      return entryService.delete(input.id);
    }),
});
