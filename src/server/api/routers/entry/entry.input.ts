import { z } from "zod";

export const createEntrySchema = z.object({
  title: z.string().max(256).min(1),
  note: z.string().max(4096).min(1),
  tags: z
    .array(z.object({ name: z.string().max(64), id: z.string().min(1) }))
    .max(10)
    .nullable(),
});

export const readEntrySchema = z.object({
  id: z.string().min(1),
});

export const updateEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().max(256).min(1),
  note: z.string().max(4096).min(1),
  tags: z
    .array(z.object({ name: z.string().max(64), id: z.string().min(1) }))
    .max(10)
    .nullable(),
  completedAt: z.date().nullable(),
});

export const deleteEntrySchema = z.object({
  id: z.string().min(1),
});
