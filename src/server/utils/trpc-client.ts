import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../routers';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    };
  },
  ssr: false,
  abortOnUnmount: true,
});
