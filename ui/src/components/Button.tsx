// src/components/Button.tsx
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const base =
    'px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';

  const variants = {
    primary:
      'bg-gradient-to-tr from-gray-400 via-gray-300 to-gray-500 dark:from-gray-700 dark:via-gray-600 dark:to-gray-800 ' +
      'hover:shadow-[0_0_15px_rgba(200,200,200,0.7)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] ' +
      'focus:ring-gray-200 dark:focus:ring-gray-500',
    secondary:
      'bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-500 dark:from-blue-700 dark:via-blue-600 dark:to-blue-800 ' +
      'hover:shadow-[0_0_15px_rgba(150,180,255,0.7)] dark:hover:shadow-[0_0_15px_rgba(100,150,255,0.5)] ' +
      'focus:ring-blue-200 dark:focus:ring-blue-500',
    danger:
      'bg-gradient-to-tr from-red-400 via-red-500 to-red-600 dark:from-red-700 dark:via-red-600 dark:to-red-800 ' +
      'hover:shadow-[0_0_15px_rgba(255,100,100,0.7)] dark:hover:shadow-[0_0_15px_rgba(255,80,80,0.5)] ' +
      'focus:ring-red-300 dark:focus:ring-red-500',
  };

  return (
    <button className={classNames(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;