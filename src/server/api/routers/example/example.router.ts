import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { exampleService } from "./service/example.service";

export const exampleRouter = createTRPCRouter({
  example: publicProcedure.query(async ({ ctx }) => {
    return exampleService.example();
  }),
});
