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
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your mail"
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
            placeholder="Enter your password"
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
