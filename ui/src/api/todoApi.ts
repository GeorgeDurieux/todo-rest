import axiosInstance from './axios';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const getTodos = async () => {
  const res = await axiosInstance.get<Todo[]>('/todos/');
  return res.data;
};

export const createTodo = async (data: { title: string; description: string }) => {
  const res = await axiosInstance.post<Todo>('/todos/', data);
  return res.data;
};

export const updateTodo = async (id: number, data: Partial<Todo>) => {
  const res = await axiosInstance.put<Todo>(`/todos/todo/${id}/`, data);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`/todos/todo/${id}/`);
};