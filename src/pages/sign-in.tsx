import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function SignIn() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await signIn('credentials', { ...data, callbackUrl: '/' });
  };

  return (
    <>
      <h2>Sign In</h2>
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
