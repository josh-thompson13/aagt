import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';
import type {
  BaseComponentProps,
  LoadingProps,
  Size,
  Variant,
} from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Button.module.css';

export interface ButtonProps
  extends BaseComponentProps,
    LoadingProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      href,
      target,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = cn(
      styles.button,
      styles[size],
      styles[variant],
      {
        'loading': loading,
        'w-full': fullWidth,
      },
      className
    );

    const content = (
      <>
        {loading ? (
          <Loader2 className={cn(styles.spinner, 'w-4 h-4')} />
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}

        <span className="flex-1">{loading && loadingText ? loadingText : children}</span>

        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          className={buttonClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} disabled={isDisabled} className={buttonClasses} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
