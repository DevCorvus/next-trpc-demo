import { z } from 'zod';
import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
