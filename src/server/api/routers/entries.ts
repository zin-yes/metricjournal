import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const entriesRouter = createTRPCRouter({
  getAllEntries: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.entries.findMany();
  }),
});
