import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        {
          'primary': "bg-blue-600 text-white hover:bg-blue-700",
          'secondary': "bg-gray-100 text-gray-900 hover:bg-gray-200",
          'ghost': "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        }[variant],
        {
          'sm': "px-3 py-1.5 text-sm",
          'md': "px-4 py-2 text-sm",
          'lg': "px-5 py-2.5 text-base",
        }[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}