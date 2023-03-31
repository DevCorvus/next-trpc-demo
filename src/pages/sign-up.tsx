import { useRouter } from 'next/router';
import { FormEvent } from 'react';

import { trpc } from '@/lib/trpc-client';

export default function SignUp() {
  const router = useRouter();
  const mutation = trpc.users.create.useMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/sign-in');
      },
    });
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Enter your mail" />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
