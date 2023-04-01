import { SubmitHandler, useForm } from 'react-hook-form';

import { UpdateUserDto } from '@/common/dtos/user.dto';
import { updateUserSchema } from '@/common/schemas/user.schema';
import { User } from '@/interfaces/user';
import { trpc } from '@/lib/trpc-client';
import { zodResolver } from '@hookform/resolvers/zod';

import ErrorMessage from './ErrorMessage';

interface EditUserPasswordFormProps {
  updateUser(updatedUser: User): void;
}

export default function EditUserPasswordForm({
  updateUser,
}: EditUserPasswordFormProps) {
  const mutation = trpc.users.update.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit: SubmitHandler<UpdateUserDto> = async (data) => {
    mutation.mutate(data, {
      onSuccess: (updatedUser) => {
        updateUser(updatedUser);
        reset();
      },
    });
  };

  return (
    <div>
      <h2>Edit password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            {...register('password')}
            id="password"
            type="password"
            placeholder="Enter new password"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>
        <br />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
