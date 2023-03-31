import Link from 'next/link';
import { useEffect } from 'react';

import { getSessionProps } from '@/auth/getSessionProps';
import { trpc } from '@/lib/trpc-client';

export const getServerSideProps = getSessionProps;

export default function Home() {
  const healthcheck = trpc.healthcheck.useQuery();

  useEffect(() => {
    if (healthcheck.data) {
      console.log(healthcheck.data);
    }
  }, [healthcheck.data]);

  return (
    <ul>
      <li>
        <Link href={'/users'}>Users</Link>
      </li>
    </ul>
  );
}
