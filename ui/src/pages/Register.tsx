import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../features/auth/authSlice';
import type { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/authApi';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.auth.loading);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    dispatch(setLoading(true));

    try {
      await registerApi({ username, email, password, password2 });
      navigate('/login'); 
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (typeof err.response?.data === 'object') {
        const messages = Object.values(err.response.data).flat();
        setError(messages.join(' '));
      } else {
        setError('Registration failed');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-light-background dark:bg-dark-background p-4 pt-16">
      {loading && <Spinner />}
      <div className="w-full max-w-md p-6 rounded-xl shadow-glow bg-white dark:bg-dark-background">
        <h1 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text text-center">
          Register
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={e => setPassword2(e.currentTarget.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-dark-background text-light-text dark:text-dark-text
                       shadow-glow focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
          />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Register;