import { forwardRef } from 'react';
import type { BaseComponentProps, ValidationProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Form.module.css';

export interface CheckboxProps
  extends BaseComponentProps,
    ValidationProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, success, warning, helperText, required, className, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const getValidationState = () => {
      if (error) return 'error';
      if (success) return 'success';
      if (warning) return 'warning';
      return 'default';
    };

    const validationState = getValidationState();

    const checkboxClasses = cn(styles.checkbox, className);

    const labelClasses = cn(styles.checkboxLabel, {
      [styles.required]: required,
    });

    const helperTextClasses = cn(styles.helperText, styles[validationState]);

    const displayText = error || success || warning || helperText;

    return (
      <div className={styles.formField}>
        <div className={styles.checkboxGroup}>
          <input ref={ref} type="checkbox" id={checkboxId} className={checkboxClasses} {...props} />

          {label && (
            <label htmlFor={checkboxId} className={labelClasses}>
              {label}
            </label>
          )}
        </div>

        {displayText && <div className={helperTextClasses}>{displayText}</div>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
