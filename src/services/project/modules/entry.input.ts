import { z } from "zod";

const createProjectEntrySchema = z.object({
  projectId: z.string().min(1, {
    message: "A project identifier must be provided to create an entry.",
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
});

const readAllProjectEntrySchema = z.object({
  limit: z.number().min(1).max(250).optional(),
  cursor: z.number().min(0).optional(),
});

const readProjectEntrySchema = z.object({
  id: z.string().min(1, {
    message: "An identifier must be provided to read an entry.",
  }),
  projectId: z.string().min(1, {
    message: "A project identifier must be provided to read an entry.",
  }),
});

const updateProjectEntrySchema = z.object({
  id: z.string().min(1, {
    message: "An identifier must be provided to update an entry.",
  }),
  projectId: z.string().min(1, {
    message: "A project identifier must be provided to update an entry.",
  }),
  completedAt: z.date().nullable(),
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

const deleteProjectEntrySchema = z.object({
  id: z.string().min(1, {
    message: "An identifier must be provided to delete an entry.",
  }),
  projectId: z.string().min(1, {
    message: "A project identifier must be provided to delete an entry.",
  }),
});

export {
  createProjectEntrySchema,
  readAllProjectEntrySchema,
  readProjectEntrySchema,
  updateProjectEntrySchema,
  deleteProjectEntrySchema,
};
