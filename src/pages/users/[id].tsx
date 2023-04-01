import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import EditUserForm from '@/components/EditUserForm';
import Loading from '@/components/Loading';
import { User } from '@/interfaces/user';
import { trpc } from '@/lib/trpc-client';
import DeleteUserForm from '@/components/DeleteUserForm';

export default function UserItem() {
  const session = useSession();
  const router = useRouter();

  const user = trpc.users.findOne.useQuery(Number(router.query.id), {
    enabled: Boolean(router.query.id),
  });
  const [userToShow, setUserToShow] = useState<User | null>(null);

  useEffect(() => {
    if (user.data) {
      setUserToShow(user.data);
    }
  }, [user.data]);

  const updateUser = (updatedUser: User) => {
    setUserToShow(updatedUser);
  };

  if (user.isPaused || user.isLoading) return <Loading />;

  return (
    <div>
      <div>
        <Link href={'/users'}>Go back</Link>
      </div>
      <br />
      <>
        {user.data && userToShow ? (
          <div>
            <div>
              <div>
                <strong>ID:</strong>
                <p>{userToShow.id}</p>
              </div>
              <div>
                <strong>Email:</strong>
                <p>{userToShow.email}</p>
              </div>
              <div>
                <strong>Password:</strong>
                <p>{userToShow.password}</p>
              </div>
              <div>
                <strong>Created at:</strong>
                <p>{userToShow.createdAt}</p>
              </div>
              <div>
                <strong>Updated at:</strong>
                <p>{userToShow.updatedAt}</p>
              </div>
            </div>
            {session.data?.user.id === user.data.id && (
              <>
                <br />
                <EditUserForm updateUser={updateUser} />
                <br />
                <DeleteUserForm />
              </>
            )}
          </div>
        ) : (
          <span>
            <i>No user</i>
          </span>
        )}
      </>
    </div>
  );
}
