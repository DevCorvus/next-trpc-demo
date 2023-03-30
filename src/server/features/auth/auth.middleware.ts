import { middleware } from '@/server/lib/trpc';
import { UnauthorizedException } from '@/server/lib/trpc/exceptions/UnauthorizedException';

// TODO: JWT auth
export const isAuthenticated = middleware(({ next, ctx }) => {
  if (!ctx.userId) throw new UnauthorizedException();
  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});
