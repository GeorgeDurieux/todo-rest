// src/components/ThemeSwitcher.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeSwitcher: React.FC = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      className="p-2 flex items-center justify-center"
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {dark ? (
        <MoonIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        < SunIcon className="w-5 h-5 text-indigo-400" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;