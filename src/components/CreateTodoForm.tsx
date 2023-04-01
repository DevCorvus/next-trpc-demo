import { SubmitHandler, useForm } from 'react-hook-form';

import { CreateTodoDto } from '@/common/dtos/todo.dto';
import { createTodoSchema } from '@/common/schemas/todo.schema';
import { Todo } from '@/interfaces/todo';
import { trpc } from '@/lib/trpc-client';
import { zodResolver } from '@hookform/resolvers/zod';

import ErrorMessage from './ErrorMessage';

interface CreateTodoFormProps {
  addTodo(todo: Todo): void;
}

export default function CreateTodoForm({ addTodo }: CreateTodoFormProps) {
  const mutation = trpc.todos.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoDto>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit: SubmitHandler<CreateTodoDto> = async (data) => {
    const newTodo = await mutation.mutateAsync(data);
    addTodo(newTodo);

    reset();
  };

  return (
    <div>
      <h2>Add todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Enter todo title"
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </div>
        <br />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
