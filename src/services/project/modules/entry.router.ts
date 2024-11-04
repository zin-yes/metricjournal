import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createProjectEntrySchema,
  deleteProjectEntrySchema,
  readAllProjectEntrySchema,
  readProjectEntrySchema,
  updateProjectEntrySchema,
} from "@/services/project/modules/entry.input";
import { projectEntryService } from "./entry.service";

export const entryRouter = createTRPCRouter({
  // TODO: REDO AFTER ADDING A WAY TO ADD NEW PROJECTS
  create: protectedProcedure
    .input(createProjectEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const result = await projectEntryService.create(
        ctx.session.user.id,
        "default_project",
        {
          ...input,
        }
      );

      return result;
    }),
  readAll: protectedProcedure
    .input(readAllProjectEntrySchema)
    .query(async ({ input, ctx }) => {
      const result = await projectEntryService.readAll(
        ctx.session.user.id,
        "default_project",
        input.limit ?? 50,
        input.cursor ?? 0
      );

      return result;
    }),
  read: protectedProcedure
    .input(readProjectEntrySchema)
    .query(async ({ input, ctx }) => {
      const result = await projectEntryService.read(
        ctx.session.user.id,
        "default_project",
        input.id
      );

      return result;
    }),
  update: protectedProcedure
    .input(updateProjectEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const result = await projectEntryService.update(
        ctx.session.user.id,
        "default_project",
        input.id,
        {
          title: input.title,
          note: input.note ?? null,
          completedAt: input.completedAt,
        }
      );
      return result;
    }),
});
