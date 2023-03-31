import { getSessionProps } from '@/auth/getSessionProps';
import { trpc } from '@/lib/trpc-client';
import { useEffect } from 'react';

export const getServerSideProps = getSessionProps;

export default function Home() {
  const healthcheck = trpc.healthcheck.useQuery();

  useEffect(() => {
    if (healthcheck.data) {
      console.log(healthcheck.data);
    }
  }, [healthcheck.data]);

  return <div>App</div>;
}
