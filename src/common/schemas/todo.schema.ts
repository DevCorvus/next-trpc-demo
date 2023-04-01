import { z } from 'zod';

const titleSchema = z.string().min(1).max(100);

export const createTodoSchema = z.object({
  title: titleSchema,
});

export const updateTodoSchema = z.object({
  title: titleSchema.optional(),
  done: z.boolean().optional(),
});
