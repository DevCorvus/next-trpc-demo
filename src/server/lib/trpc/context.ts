import { getAuthBearer } from '@/server/features/auth/utils/getAuthBearer';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContext(opts: CreateNextContextOptions) {
  let userId: number | null = null;
  const bearer = getAuthBearer(opts.req);

  if (bearer && !Number.isNaN(parseInt(bearer))) {
    userId = parseInt(bearer);
  }

  return {
    userId,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
