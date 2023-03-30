import { trpc } from '@/lib/trpc-client';

export default function Home() {
  const healthcheck = trpc.healthcheck.useQuery();

  if (healthcheck.isLoading) return <span>Loading...</span>;

  return <div>{healthcheck.data}</div>;
}
