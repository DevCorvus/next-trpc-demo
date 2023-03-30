import { router, publicProcedure } from '../trpc';
import { todosRouter } from './todos';
import { usersRouter } from './users';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'healthy!'),
  users: usersRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
