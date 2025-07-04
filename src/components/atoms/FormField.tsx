'use client';

import type { InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  isValid?: boolean;
  onValidate?: (value: string) => Promise<{ isValid: boolean; error?: string }>;
  debounceMs?: number;
}

export const FormField = ({
  label,
  error,
  helperText,
  required = false,
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  isValid,
  onValidate,
  debounceMs = 300,
  className,
  id,
  onChange,
  ...props
}: FormFieldProps) => {
  const [validationState, setValidationState] = useState<{
    isValidating: boolean;
    isValid?: boolean;
    error?: string;
  }>({ isValidating: false });

  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (onValidate) {
      setValidationState({ isValidating: true });

      try {
        const result = await onValidate(e.target.value);
        setValidationState({
          isValidating: false,
          isValid: result.isValid,
          error: result.error,
        });
      } catch (err) {
        setValidationState({
          isValidating: false,
          isValid: false,
          error: 'Validation error',
        });
      }
    }
  };

  const showError = error || validationState.error;
  const showValid = isValid || (validationState.isValid && !showError);
  const showValidating = isLoading || validationState.isValidating;

  return (
    <div className="space-y-1">
      <label
        htmlFor={fieldId}
        className={cn(
          'block text-sm font-medium',
          showError ? 'text-red-700' : 'text-gray-700',
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        )}
      >
        {label}
      </label>

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className={cn('text-gray-400', showError && 'text-red-400')}>{leftIcon}</div>
          </div>
        )}

        <input
          id={fieldId}
          className={cn(
            'block w-full rounded-lg border transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
            sizes[size],
            leftIcon && 'pl-10',
            (rightIcon || showValidating || showValid || showError) && 'pr-10',
            showError
              ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
              : showValid
                ? 'border-success-300 bg-success-50 text-success-900 focus:border-success-500 focus:ring-success-500'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-teal-600 focus:ring-teal-600',
            className
          )}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={
            showError ? `${fieldId}-error` : helperText ? `${fieldId}-help` : undefined
          }
          onChange={handleChange}
          {...props}
        />

        {(rightIcon || showValidating || showValid || showError) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {showValidating ? (
              <div className="animate-spin h-5 w-5 text-gray-400">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    className="opacity-75"
                  />
                </svg>
              </div>
            ) : showError ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : showValid ? (
              <CheckCircle className="h-5 w-5 text-success-400" />
            ) : (
              rightIcon && <div className="text-gray-400">{rightIcon}</div>
            )}
          </div>
        )}
      </div>

      {showError && (
        <p
          id={`${fieldId}-error`}
          className="text-sm text-red-600 flex items-center gap-1"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {showError}
        </p>
      )}

      {helperText && !showError && (
        <p id={`${fieldId}-help`} className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
