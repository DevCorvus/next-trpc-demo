import { todosRouter } from './features/todos/todos.router';
import { usersRouter } from './features/users/users.router';
import { router } from './lib/trpc';
import { publicProcedure } from './lib/trpc/procedures';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'healthy!'),
  users: usersRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
