import { createTRPCRouter } from "@/services/trpc";
import { entryRouter } from "./modules/entry.router";

export const projectRouter = createTRPCRouter({
  entry: entryRouter,
});
