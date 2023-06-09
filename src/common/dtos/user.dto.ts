import { z } from 'zod';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
