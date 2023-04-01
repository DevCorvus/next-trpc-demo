import { FormEvent, useState } from 'react';

import { Todo } from '@/interfaces/todo';
import { trpc } from '@/lib/trpc-client';

interface EditTodoFormProps {
  todo: Todo;
  updateTodo(updatedTodo: Todo): void;
}

export default function EditTodoForm({ todo, updateTodo }: EditTodoFormProps) {
  const mutation = trpc.todos.update.useMutation();
  const [done, setDone] = useState<boolean>(todo.done);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { title: string };

    const updatedTodo = await mutation.mutateAsync({
      id: todo.id,
      data: { ...data, done },
    });
    updateTodo(updatedTodo);
  };

  return (
    <div>
      <h2>Edit todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter todo title"
            defaultValue={todo.title}
          />
        </div>
        <br />
        <div>
          <input
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
            id="done"
            type="checkbox"
            name="done"
          />
          <label htmlFor="done"> Done</label>
        </div>
        <br />
        <button disabled={mutation.isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
