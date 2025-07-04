import { forwardRef, useState } from 'react';
import type { BaseComponentProps, ValidationProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Form.module.css';

export interface TextareaProps
  extends BaseComponentProps,
    ValidationProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      success,
      warning,
      helperText,
      required,
      fullWidth = true,
      resize = false,
      className,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const getValidationState = () => {
      if (error) return 'error';
      if (success) return 'success';
      if (warning) return 'warning';
      return 'default';
    };

    const validationState = getValidationState();

    const textareaClasses = cn(
      styles.textarea,
      {
        [styles.error || 'error']: error,
        [styles.success || 'success']: success,
        [styles.warning || 'warning']: warning,
        'w-full': fullWidth,
        'resize-none': !resize,
        'resize-y': resize,
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
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={textareaClasses}
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
            <label htmlFor={textareaId} className={labelClasses}>
              {label}
            </label>
          )}
        </div>

        {displayText && <div className={helperTextClasses}>{displayText}</div>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
