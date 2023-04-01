import { useRouter } from 'next/router';
import { FormEvent } from 'react';

import { trpc } from '@/lib/trpc-client';

interface DeleteTodoFormProps {
  todoId: number;
}

export default function DeleteTodoForm({ todoId }: DeleteTodoFormProps) {
  const router = useRouter();
  const mutation = trpc.todos.delete.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(todoId, {
      onSuccess: () => {
        router.push('/todos');
      },
    });
  };

  return (
    <div>
      <h2>Delete todo</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
