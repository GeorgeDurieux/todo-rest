import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TodoList from '../pages/TodoList';

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/todos" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/todos" /> : <Register />} />
      <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;