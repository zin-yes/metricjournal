import { createTRPCRouter } from "@/services/trpc";
import { projectRouter } from "@/services/project/project.router";
import { timelineRouter } from "@/services/timeline/timeline.router";

export const appRouter = createTRPCRouter({
  timeline: timelineRouter,
  project: projectRouter,
});

export type AppRouter = typeof appRouter;
