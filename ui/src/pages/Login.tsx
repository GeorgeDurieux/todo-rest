import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setLoading } from '../features/auth/authSlice';
import { login as loginApi } from '../api/authApi';
import type { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.auth.loading);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    try {
      const data = await loginApi({ username, password });
      dispatch(setToken({ token: data.token, username }));
      navigate('/todos');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-light-background dark:bg-dark-background p-4 pt-16">
      {loading && <Spinner />}
      <div className="w-full max-w-md p-6 rounded-xl shadow-glow bg-white dark:bg-dark-background">
        <h1 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-dark-background text-light-text dark:text-dark-text
                       shadow-glow focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-dark-background text-light-text dark:text-dark-text
                       shadow-glow focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
          />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;