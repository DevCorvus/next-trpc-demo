import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const todosRouter = router({
  findAll: publicProcedure.query(() => {
    return 'All todos';
  }),
  findOne: publicProcedure.input(z.number().int()).query(({ input }) => {
    return `One todo by ID: ${input}`;
  }),
});
