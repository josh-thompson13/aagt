import { forwardRef } from 'react';
import type { BaseComponentProps, Size } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Card.module.css';

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'filled'
  | 'glassmorphism'
  | 'glassmorphismDark';

export interface CardProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: Size;
  interactive?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      interactive = false,
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const cardClasses = cn(
      styles.card,
      styles[variant],
      styles[size],
      {
        'interactive': interactive,
        'loading': loading,
      },
      className
    );

    if (loading) {
      return (
        <div ref={ref} className={cardClasses} {...props}>
          <div className="space-y-3">
            <div className={cn(styles.skeleton, 'h-4 w-3/4')} />
            <div className={cn(styles.skeleton, 'h-4 w-full')} />
            <div className={cn(styles.skeleton, 'h-4 w-2/3')} />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.header, className)} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.body, className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.footer, className)} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
