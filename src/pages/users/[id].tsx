import Link from 'next/link';
import { useRouter } from 'next/router';

import Loading from '@/components/Loading';
import { trpc } from '@/lib/trpc-client';

export default function UserItem() {
  const router = useRouter();
  const user = trpc.users.findOne.useQuery(Number(router.query.id));

  if (user.isLoading) return <Loading />;

  return (
    <div>
      <div>
        <Link href={'/users'}>Go back</Link>
      </div>
      <br />
      <>
        {user.data && (
          <div>
            <div>
              <strong>ID:</strong>
              <p>{user.data.id}</p>
            </div>
            <div>
              <strong>Email:</strong>
              <p>{user.data.email}</p>
            </div>
            <div>
              <strong>Password:</strong>
              <p>{user.data.password}</p>
            </div>
            <div>
              <strong>Created at:</strong>
              <p>{user.data.createdAt}</p>
            </div>
            <div>
              <strong>Updated at:</strong>
              <p>{user.data.updatedAt}</p>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
