import * as trpcNext from '@trpc/server/adapters/next';

interface Context {}

export async function createContext(
  _opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  return {};
}
