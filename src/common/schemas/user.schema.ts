import { z } from 'zod';

const emailSchema = z.string().email().max(200);
const passwordSchema = z.string().min(6).max(250);

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
});
