import Link from 'next/link';

import Loading from '@/components/Loading';
import { trpc } from '@/lib/trpc-client';

export default function UserList() {
  const users = trpc.users.findAll.useQuery();

  if (users.isLoading) return <Loading />;

  if (users.data && users.data.length > 0) {
    return (
      <>
        <div>
          <Link href={'/'}>Go back</Link>
        </div>
        <br />
        <header>
          <h2>Users</h2>
        </header>
        <ul>
          {users.data.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>{user.email}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return <span>No users</span>;
  }
}
