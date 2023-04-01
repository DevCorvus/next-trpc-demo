import { FormEvent, useRef } from 'react';

import { Todo } from '@/interfaces/todo';
import { trpc } from '@/lib/trpc-client';

interface CreateTodoFormProps {
  addTodo(todo: Todo): void;
}

export default function CreateTodoForm({ addTodo }: CreateTodoFormProps) {
  const mutation = trpc.todos.create.useMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { title: string };

    formRef.current?.reset();

    const newTodo = await mutation.mutateAsync(data);
    addTodo(newTodo);
  };

  return (
    <div>
      <h2>Add todo</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Enter todo title" />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
