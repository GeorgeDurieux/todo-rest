import React, { useState } from 'react';
import type { Todo } from '../api/todoApi';
import TodoForm from './TodoForm';
import Button from './Button';

interface TodoCardProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const handleCheckbox = () => {
    onUpdate({ ...todo, completed: !todo.completed }); // optimistic update
  };

  return (
    <div
      className={`p-4 mb-4 rounded-xl shadow-glow transition-colors duration-300
        ${editing ? 'bg-light-card dark:bg-dark-card' : 'bg-light-card dark:bg-dark-card'}`}
    >
      {editing ? (
        <TodoForm
          initialData={todo}
          onSubmit={(data) => {
            onUpdate({ ...todo, ...data });
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckbox}
                className="w-5 h-5 accent-light-primary dark:accent-dark-primary mr-2"
              />
              <strong className="text-light-text dark:text-dark-text">{todo.title}</strong>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setEditing(true)} variant="primary">
                Edit
              </Button>
              <Button onClick={() => onDelete(todo.id)} variant="danger">
                Delete
              </Button>
            </div>
          </div>
          <p className="text-light-text dark:text-dark-text">{todo.description}</p>
        </>
      )}
    </div>
  );
};

export default TodoCard;