import { FormEvent } from 'react';

import { trpc } from '@/lib/trpc-client';
import { signOut } from 'next-auth/react';

export default function DeleteUserForm() {
  const mutation = trpc.users.delete.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(undefined, {
      onSuccess: async () => {
        await signOut({ callbackUrl: '/' });
      },
    });
  };

  return (
    <div>
      <h2>Delete user</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
