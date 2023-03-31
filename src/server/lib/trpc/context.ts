import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/server/features/auth/auth.config';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(opts.req, opts.res, nextAuthOptions);
  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
