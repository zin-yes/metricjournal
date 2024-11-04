import { createTRPCRouter } from "@/server/api/trpc";
import { entryRouter } from "./modules/entry.router";

export const projectRouter = createTRPCRouter({
  entry: entryRouter,
});
