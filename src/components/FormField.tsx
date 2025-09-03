import React from 'react';
import { Calendar } from 'lucide-react'; // Import Calendar icon

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  id: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'file' | 'textarea' | 'select'; // Added 'select' type
  errorMessage?: string;
  infoMessage?: string;
  containerClassName?: string; // Added for styling the outer div
  options?: { value: string; label: string }[]; // Added for select type
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  errorMessage,
  infoMessage,
  className, // For styling the input element itself
  containerClassName, // For styling the outer div
  options, // For select type
  ...props
}) => {
  const baseInputClasses = `w-full px-4 py-2 rounded-lg text-text placeholder-textSecondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out
    ${errorMessage ? 'border-error focus:ring-error focus:border-error' : 'border-border'}
    ${props.readOnly ? 'bg-gray-200 text-textSecondary cursor-not-allowed' : 'bg-white border'}
    ${className || ''}
  `;

  const fileInputClasses = `file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90`;

  return (
    <div className={`mb-4 ${containerClassName || ''}`}>
      <label htmlFor={id} className="block text-text text-sm font-medium mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={`${baseInputClasses} min-h-[80px]`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : type === 'date' ? (
        <div className="relative">
          <input
            id={id}
            type="date"
            className={`${baseInputClasses} pr-10 appearance-none`} // Add pr-10 and appearance-none for date input
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
          {/* Calendar icon positioned absolutely */}
          <Calendar size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none" />
        </div>
      ) : type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            className={`${baseInputClasses} appearance-none pr-10`} // Add appearance-none and pr-10 for select
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow icon */}
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          className={`${baseInputClasses} ${type === 'file' ? fileInputClasses : ''}`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {errorMessage && <p className="mt-1 text-error text-xs">{errorMessage}</p>}
      {infoMessage && <p className="mt-1 text-textSecondary text-xs">{infoMessage}</p>}
    </div>
  );
};

export default FormField;
