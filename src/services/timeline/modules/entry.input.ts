import { z } from "zod";

export const createTimelineEntrySchema = z.object({
  title: z
    .string()
    .max(256, {
      message: "A title must be no longer than 256 characters.",
    })
    .min(1, {
      message: "An entry must have a title.",
    }),
  note: z
    .string()
    .max(4096, {
      message: "A note must be no longer than 4096 characters.",
    })
    .optional(),
});

export const readTimelineEntrySchema = z.object({
  id: z.string().min(1, {
    message: "An identifier must be provided to read an entry.",
  }),
});

export const readAllTimelineEntrySchema = z.object({
  limit: z.number().min(1).max(250).optional(),
  cursor: z.number().min(0).optional(),
});

// export const readAllFromDayEntrySchema = z.object({
//   date: z.date(),
//   limit: z.number().min(1).max(250).optional(),
//   cursor: z.number().min(0).optional(),
// });

export const updateTimelineEntrySchema = z.object({
  id: z.string().min(1, {
    message: "An identifier must be provided to update an entry.",
  }),
  title: z
    .string()
    .max(256, {
      message: "A title must be no longer than 256 characters.",
    })
    .min(1, {
      message: "An entry must have a title.",
    }),
  note: z
    .string()
    .max(4096, {
      message: "A note must be no longer than 4096 characters.",
    })
    .optional(),
  completedAt: z.date().nullable(),
});

export const deleteEntrySchema = z.object({
  id: z.string().min(1, {
    message: "An identifier must be provided to delete an entry.",
  }),
});
