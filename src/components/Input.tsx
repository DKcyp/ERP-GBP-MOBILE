import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  // Removed 'label' and 'icon' props as they are handled externally or not present in the basic design
}

const Input: React.FC<InputProps> = ({ id, ...props }) => {
  return (
    <div className="w-full">
      <input
        id={id}
        className={`w-full px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder-textSecondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out`}
        {...props}
      />
    </div>
  );
};

export default Input;
