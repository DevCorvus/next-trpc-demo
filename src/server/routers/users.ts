import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const usersRouter = router({
  findAll: publicProcedure.query(() => {
    return 'All users';
  }),
  findOne: publicProcedure.input(z.number().int()).query(({ input }) => {
    return `One user by ID: ${input}`;
  }),
});
