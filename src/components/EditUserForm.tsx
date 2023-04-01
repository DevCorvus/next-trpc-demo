import { FormEvent, useRef } from 'react';

import { User } from '@/interfaces/user';
import { trpc } from '@/lib/trpc-client';

interface EditUserFormProps {
  updateUser(updatedUser: User): void;
}

export default function EditUserForm({ updateUser }: EditUserFormProps) {
  const mutation = trpc.users.update.useMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    formRef.current?.reset();

    const updatedUser = await mutation.mutateAsync({
      email: data.email || undefined,
      password: data.password || undefined,
    });
    updateUser(updatedUser);
  };

  return (
    <div>
      <h2>Edit user</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter new email (optional)"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter new password (optional)"
          />
        </div>
        <br />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
