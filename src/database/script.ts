import { eq } from "drizzle-orm";
import { db } from ".";
import { timelineEntry } from "./schema";

await db
  .update(timelineEntry)
  .set({
    userId: "uhCpsDw5hwU3o8AjiSNGT",
  })
  .where(eq(timelineEntry.userId, "hiUw5hpZ8KH46D7vcWgzi"));
