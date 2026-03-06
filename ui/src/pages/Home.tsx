import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const Home: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Welcome to Todo REST!</h1>
      <p>
        {username
          ? `Hello, ${username}! Here you can manage your todos efficiently.`
          : 'This app helps you manage your todos efficiently. Register or log in to get started.'}
      </p>
      <p>
        The frontend is built with React, using Redux and Axios, and the backend with Django REST Framework.
        Use the navigation bar above to explore your account and todos.
      </p>
    </div>
  );
};

export default Home;