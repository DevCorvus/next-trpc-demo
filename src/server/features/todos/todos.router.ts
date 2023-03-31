import { z } from 'zod';

import { router } from '@/server/lib/trpc';
import { UnauthorizedException } from '@/server/lib/trpc/exceptions/UnauthorizedException';
import {
  protectedProcedure,
  publicProcedure,
} from '@/server/lib/trpc/procedures';

import { idSchema } from '../shared/schemas/id.schema';
import { createTodoSchema, updateTodoSchema } from './todo.schema';
import { todosService } from './todos.service';

export const todosRouter = router({
  findAll: publicProcedure.query(() => {
    return todosService.findAll();
  }),
  findOne: publicProcedure.input(idSchema).query(({ input }) => {
    return todosService.findOne(input);
  }),
  create: protectedProcedure
    .input(createTodoSchema)
    .mutation(({ ctx, input }) => {
      return todosService.create(ctx.session.user.id, input);
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: idSchema,
        data: updateTodoSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todoExists = await todosService.exists(
        input.id,
        ctx.session.user.id
      );

      if (!todoExists) throw new UnauthorizedException();

      return todosService.update(input.id, input.data);
    }),
  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input }) => {
      const todoExists = await todosService.exists(input, ctx.session.user.id);

      if (!todoExists) throw new UnauthorizedException();

      return todosService.delete(input);
    }),
});
