import { ChevronDown } from 'lucide-react';
import { forwardRef, useState } from 'react';
import type { BaseComponentProps, ValidationProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Form.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends BaseComponentProps,
    ValidationProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      success,
      warning,
      helperText,
      required,
      options,
      placeholder,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const getValidationState = () => {
      if (error) return 'error';
      if (success) return 'success';
      if (warning) return 'warning';
      return 'default';
    };

    const validationState = getValidationState();

    const selectClasses = cn(
      styles.select,
      {
        [styles.error || 'error']: error,
        [styles.success || 'success']: success,
        [styles.warning || 'warning']: warning,
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
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
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
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <div className={styles.selectIcon}>
            <ChevronDown className="w-4 h-4" />
          </div>

          {label && (
            <label htmlFor={selectId} className={labelClasses}>
              {label}
            </label>
          )}
        </div>

        {displayText && <div className={helperTextClasses}>{displayText}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';
