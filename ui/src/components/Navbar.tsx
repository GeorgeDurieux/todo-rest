import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { logout as logoutAction } from '../features/auth/authSlice';
import { logout as logoutApi } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import Button from './Button';

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const username = useSelector((state: RootState) => state.auth.username);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(logoutAction());
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 
                    bg-light-navbar dark:bg-dark-navbar 
                    text-light-text dark:text-dark-text 
                    shadow-md mb-6 transition-colors duration-300">
      {/* Left section */}
      <div className="flex items-center space-x-4 font-bold text-lg">
        <Link to="/" className="hover:text-light-primary dark:hover:text-dark-primary transition">
          My Todo App
        </Link>
        <ThemeSwitcher />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <span className="font-medium">{username}</span>
            <Button onClick={handleLogout} variant="primary">Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login"><Button variant="primary">Login</Button></Link>
            <Link to="/register"><Button variant="primary">Register</Button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;