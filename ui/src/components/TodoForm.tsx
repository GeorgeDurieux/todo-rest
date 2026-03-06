import React, { useState } from 'react';
import type { Todo } from '../api/todoApi';
import Button from './Button';

interface TodoFormProps {
  initialData?: Partial<Todo>;
  onSubmit: (data: { title: string; description: string }) => void;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  const handleReset = () => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3 transition-colors duration-300">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        required
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-dark-background text-light-text dark:text-dark-text
                   shadow-glow focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.currentTarget.value)}
        required
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-dark-background text-light-text dark:text-dark-text
                   shadow-glow focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="primary">
          {initialData ? 'Save' : 'Add Todo'}
        </Button>
        {initialData && (
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;