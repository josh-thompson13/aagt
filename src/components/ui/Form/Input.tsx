import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import type { BaseComponentProps, ValidationProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Form.module.css';

export interface InputProps
  extends BaseComponentProps,
    ValidationProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      warning,
      helperText,
      required,
      leftIcon,
      rightIcon,
      fullWidth = true,
      type = 'text',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const getValidationState = () => {
      if (error) return 'error';
      if (success) return 'success';
      if (warning) return 'warning';
      return 'default';
    };

    const validationState = getValidationState();

    const inputClasses = cn(
      styles.input,
      {
        [styles.error || 'error']: error,
        [styles.success || 'success']: success,
        [styles.warning || 'warning']: warning,
        [styles.inputWithIcon || 'input-with-icon']: leftIcon,
        'w-full': fullWidth,
      },
      className
    );

    const labelClasses = cn(styles.label, {
      [styles.floating || 'floating']: isFocused || hasValue,
      [styles.required || 'required']: required,
    });

    const helperTextClasses = cn(styles.helperText, styles[validationState as keyof typeof styles]);

    const displayText = error || success || warning || helperText;

    return (
      <div className={cn(styles.formField, { 'w-full': fullWidth })}>
        <div className="relative">
          {leftIcon && <div className={styles.inputIcon}>{leftIcon}</div>}

          <input
            ref={ref}
            type={actualType}
            id={inputId}
            className={inputClasses}
            placeholder=" "
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value !== '');
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value !== '');
              props.onChange?.(e);
            }}
            {...props}
          />

          {label && (
            <label htmlFor={inputId} className={labelClasses}>
              {label}
            </label>
          )}

          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{rightIcon}</div>
          )}
        </div>

        {displayText && <div className={helperTextClasses}>{displayText}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
