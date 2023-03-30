import { createContext } from '@/server/lib/trpc/context';
import { appRouter } from '@/server/router';
import * as trpcNext from '@trpc/server/adapters/next';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
  onError({ error }) {
    // ...
  },
});
