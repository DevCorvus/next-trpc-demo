import { SubmitHandler, useForm } from 'react-hook-form';

import { UpdateTodoDto } from '@/common/dtos/todo.dto';
import { updateTodoSchema } from '@/common/schemas/todo.schema';
import { Todo } from '@/interfaces/todo';
import { trpc } from '@/lib/trpc-client';
import { zodResolver } from '@hookform/resolvers/zod';

import ErrorMessage from './ErrorMessage';

interface EditTodoFormProps {
  todo: Todo;
  updateTodo(updatedTodo: Todo): void;
}

export default function EditTodoForm({ todo, updateTodo }: EditTodoFormProps) {
  const mutation = trpc.todos.update.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTodoDto>({
    resolver: zodResolver(updateTodoSchema),
  });

  const onSubmit: SubmitHandler<UpdateTodoDto> = async (data) => {
    const updatedTodo = await mutation.mutateAsync({
      id: todo.id,
      data: data,
    });
    updateTodo(updatedTodo);
  };

  return (
    <div>
      <h2>Edit todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            {...register('title')}
            id="title"
            type="text"
            placeholder="Enter todo title"
            defaultValue={todo.title}
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </div>
        <br />
        <div>
          <input {...register('done')} id="done" type="checkbox" />
          <label htmlFor="done"> Done</label>
          {errors.done && <ErrorMessage message={errors.done.message} />}
        </div>
        <br />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
