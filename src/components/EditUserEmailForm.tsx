import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UpdateUserDto } from '@/common/dtos/user.dto';
import { updateUserSchema } from '@/common/schemas/user.schema';
import { User } from '@/interfaces/user';
import { trpc } from '@/lib/trpc-client';
import { zodResolver } from '@hookform/resolvers/zod';

import ErrorMessage from './ErrorMessage';

interface EditUserEmailFormProps {
  updateUser(updatedUser: User): void;
}

export default function EditUserEmailForm({
  updateUser,
}: EditUserEmailFormProps) {
  const mutation = trpc.users.update.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
  });

  const [isEmailUpdateError, setEmailUpdateError] = useState(false);

  const onSubmit: SubmitHandler<UpdateUserDto> = async (data) => {
    setEmailUpdateError(false);

    mutation.mutate(data, {
      onSuccess: (updatedUser) => {
        updateUser(updatedUser);
        reset();
      },
      onError: () => {
        setEmailUpdateError(true);
      },
    });
  };

  return (
    <div>
      <h2>Edit email</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            {...register('email')}
            id="email"
            type="text"
            placeholder="Enter new email"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <br />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
        {isEmailUpdateError && <ErrorMessage message="Email already in use" />}
      </form>
    </div>
  );
}
