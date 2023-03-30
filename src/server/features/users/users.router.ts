import { idSchema } from '@/server/features/shared/schemas/id.schema';
import { router } from '@/server/lib/trpc';
import {
  protectedProcedure,
  publicProcedure,
} from '@/server/lib/trpc/procedures';

import { createUserSchema, updateUserSchema } from './user.schema';
import { usersService } from './users.service';

export const usersRouter = router({
  findAll: publicProcedure.query(() => {
    return usersService.findAll();
  }),
  findOne: publicProcedure.input(idSchema).query(({ input }) => {
    return usersService.findOne(input);
  }),
  create: publicProcedure.input(createUserSchema).mutation(({ input }) => {
    return usersService.create(input);
  }),
  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) => {
      return usersService.update(ctx.userId, input);
    }),
  delete: protectedProcedure.mutation(({ ctx }) => {
    return usersService.delete(ctx.userId);
  }),
});
