import Link from 'next/link';
import { useEffect, useState } from 'react';

import CreateTodoForm from '@/components/CreateTodoForm';
import Loading from '@/components/Loading';
import { Todo } from '@/interfaces/todo';
import { trpc } from '@/lib/trpc-client';
import { useSession } from 'next-auth/react';

export default function TodoList() {
  const session = useSession();
  const todos = trpc.todos.findAll.useQuery();
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);

  useEffect(() => {
    if (todos.data) {
      setTodosToShow(todos.data);
    }
  }, [todos.data]);

  const addTodo = (newTodo: Todo) => {
    setTodosToShow((prevTodos) => [...prevTodos, newTodo]);
  };

  if (todos.isLoading) return <Loading />;

  return (
    <>
      <div>
        <Link href={'/'}>Go back</Link>
      </div>
      <br />
      {session.data && (
        <>
          <CreateTodoForm addTodo={addTodo} />
          <br />
        </>
      )}
      {todosToShow.length > 0 ? (
        <div>
          <header>
            <h2>Todos</h2>
          </header>
          <ul>
            {todosToShow.map((todo) => (
              <li key={todo.id}>
                <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span>No todos</span>
      )}
    </>
  );
}
