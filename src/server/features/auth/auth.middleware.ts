import { middleware } from '@/server/lib/trpc';
import { UnauthorizedException } from '@/server/lib/trpc/exceptions/UnauthorizedException';

export const isAuthenticated = middleware(({ next, ctx }) => {
  if (!ctx.session) throw new UnauthorizedException();
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
