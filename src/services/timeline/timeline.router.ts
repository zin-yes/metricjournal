import { createTRPCRouter } from "@/server/api/trpc";
import { entryRouter } from "@/services/timeline/modules/entry.router";

export const timelineRouter = createTRPCRouter({
  entry: entryRouter,
});
