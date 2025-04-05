// app/components/ui/button.tsx
import React from 'react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'ghost' | 'default';
  size?: 'icon' | 'default';
};

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-black text-white',
    ghost: 'bg-transparent text-black',
  };

  const sizeClasses = {
    default: 'px-3 py-2 text-sm',
    icon: 'p-0 w-6 h-6',
  };

  const classes = clsx(
    'rounded',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
