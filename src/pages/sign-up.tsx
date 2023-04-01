import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useProtectRoute } from '@/auth/useProtectRoute';
import { CreateUserDto } from '@/common/dtos/user.dto';
import { createUserSchema } from '@/common/schemas/user.schema';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { trpc } from '@/lib/trpc-client';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUp() {
  const isLoading = useProtectRoute('guest');

  const mutation = trpc.users.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
  });

  const [isRegisterError, setRegisterError] = useState(false);

  const onSubmit: SubmitHandler<CreateUserDto> = async (data) => {
    setRegisterError(false);

    mutation.mutate(data, {
      onSuccess: async () => {
        await signIn('credentials', { ...data, callbackUrl: '/' });
      },
      onError: () => {
        setRegisterError(true);
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <h2>Sign Up</h2>
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
        {isRegisterError && (
          <>
            <br />
            <ErrorMessage message="User already exists" />
          </>
        )}
      </form>
    </>
  );
}
