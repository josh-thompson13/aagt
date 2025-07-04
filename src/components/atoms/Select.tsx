'use client';

import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
}

export const Select = ({
  label,
  options,
  error,
  helperText,
  required = false,
  size = 'md',
  placeholder = 'Please select...',
  className,
  id,
  ...props
}: SelectProps) => {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={fieldId}
        className={cn(
          'block text-sm font-medium',
          error ? 'text-red-700' : 'text-gray-700',
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        )}
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={fieldId}
          className={cn(
            'block w-full rounded-lg border appearance-none transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-1 pr-10',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
            sizes[size],
            error
              ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 bg-white text-gray-900 focus:border-teal-600 focus:ring-teal-600',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-help` : undefined}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className={cn('h-5 w-5', error ? 'text-red-400' : 'text-gray-400')} />
        </div>
      </div>

      {error && (
        <p
          id={`${fieldId}-error`}
          className="text-sm text-red-600 flex items-center gap-1"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${fieldId}-help`} className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
