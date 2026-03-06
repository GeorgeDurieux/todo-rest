import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { getTodos, createTodo, updateTodo as updateApiTodo, deleteTodo as deleteApiTodo } from '../api/todoApi';
import { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError } from '../features/todoSlice';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import Spinner from '../components/Spinner';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));
      try {
        const todos = await getTodos();
        dispatch(setTodos(todos.reverse()));
      } catch {
        dispatch(setError('Failed to load todos'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchTodos();
  }, [dispatch]);

  const handleAdd = async (data: { title: string; description: string }) => {
    try {
      const newTodo = await createTodo(data);
      dispatch(addTodo(newTodo));
    } catch {
      dispatch(setError('Failed to add todo'));
    }
  };

  const handleUpdate = async (todo: any) => {
    dispatch(updateTodo(todo));
    try {
      await updateApiTodo(todo.id, todo);
    } catch {
      dispatch(setError('Failed to update todo'));
    }
  };

  const handleDelete = async (id: number) => {
    dispatch(deleteTodo(id));
    try {
      await deleteApiTodo(id);
    } catch {
      dispatch(setError('Failed to delete todo'));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-light-background dark:bg-dark-background p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text text-center">My Todos</h1>

        {loading && <Spinner />}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <TodoForm onSubmit={handleAdd} />

        <div className="space-y-4">
          {items.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;