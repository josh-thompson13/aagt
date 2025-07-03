import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'soft' | 'medium' | 'large';
  hover?: boolean;
}

export const Card = ({
  children,
  className,
  padding = 'md',
  shadow = 'soft',
  hover = false,
}: CardProps) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadows = {
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100',
        paddings[padding],
        shadows[shadow],
        hover && 'transition-all duration-300 hover:shadow-large hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};