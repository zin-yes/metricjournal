import { createTRPCRouter } from "@/server/api/trpc";
import { entryRouter } from "@/server/api/routers/entry/entry.router";

export const appRouter = createTRPCRouter({
  entry: entryRouter,
});

export type AppRouter = typeof appRouter;
