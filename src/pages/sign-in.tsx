import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useProtectRoute } from '@/auth/useProtectRoute';
import { loginSchema, LoginSchemaType } from '@/common/schemas/auth.schema';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignIn() {
  const isLoading = useProtectRoute('guest');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoginError, setLoginError] = useState(false);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    setLoginError(false);
    const res = await signIn('credentials', { ...data, redirect: false });

    if (res?.ok) {
      router.push('/');
    } else {
      setLoginError(true);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            {...register('email')}
            type="text"
            id="email"
            placeholder="Enter your mail"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            {...register('password')}
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>
        <br />
        <button type="submit">Submit</button>
        {isLoginError && (
          <>
            <br />
            <ErrorMessage message="Wrong email or password" />
          </>
        )}
      </form>
    </>
  );
}
