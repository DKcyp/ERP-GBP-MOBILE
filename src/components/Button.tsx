import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 active:scale-95
                 ${className || 'bg-primary text-white hover:bg-primary/90'}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
