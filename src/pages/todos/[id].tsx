import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DeleteTodoForm from '@/components/DeleteTodoForm';
import EditTodoForm from '@/components/EditTodoForm';
import Loading from '@/components/Loading';
import { Todo } from '@/interfaces/todo';
import { trpc } from '@/lib/trpc-client';

export default function TodoItem() {
  const session = useSession();
  const router = useRouter();

  const todo = trpc.todos.findOne.useQuery(Number(router.query.id), {
    enabled: Boolean(router.query.id),
  });
  const [todoToShow, setTodoToShow] = useState<Todo | null>(null);

  useEffect(() => {
    if (todo.data) {
      setTodoToShow(todo.data);
    }
  }, [todo.data]);

  const updateTodo = (updatedTodo: Todo) => {
    setTodoToShow(updatedTodo);
  };

  if (todo.isPaused || todo.isLoading) return <Loading />;

  return (
    <div>
      <div>
        <Link href={'/todos'}>Go back</Link>
      </div>
      <br />
      <>
        {todo.data && todoToShow ? (
          <div>
            <div>
              <div>
                <strong>User ID:</strong>
                <p>{todoToShow.userId}</p>
              </div>
              <div>
                <strong>ID:</strong>
                <p>{todoToShow.id}</p>
              </div>
              <div>
                <strong>Title:</strong>
                <p>{todoToShow.title}</p>
              </div>
              <div>
                <strong>Done:</strong>
                <p>{String(todoToShow.done)}</p>
              </div>
              <div>
                <strong>Created at:</strong>
                <p>{todoToShow.createdAt}</p>
              </div>
              <div>
                <strong>Updated at:</strong>
                <p>{todoToShow.updatedAt}</p>
              </div>
            </div>
            {session.data?.user.id === todo.data.userId && (
              <>
                <br />
                <EditTodoForm todo={todo.data} updateTodo={updateTodo} />
                <br />
                <DeleteTodoForm todoId={todo.data.id} />
              </>
            )}
          </div>
        ) : (
          <span>
            <i>No todo</i>
          </span>
        )}
      </>
    </div>
  );
}
