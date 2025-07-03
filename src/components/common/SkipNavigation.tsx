'use client';

import { useSkipNavigation } from '@/hooks/useAccessibility';
import { cn } from '@/utils/cn';

interface SkipNavigationProps {
  className?: string;
}

export const SkipNavigation = ({ className }: SkipNavigationProps) => {
  const { skipToMain, skipToContent } = useSkipNavigation();

  const skipLinks = [
    {
      label: 'Skip to main content',
      action: skipToMain,
    },
    {
      label: 'Skip to navigation',
      action: () => skipToContent('main-navigation'),
    },
    {
      label: 'Skip to footer',
      action: () => skipToContent('footer'),
    },
  ];

  return (
    <div className={cn('sr-only focus-within:not-sr-only', className)}>
      <nav aria-label="Skip navigation links">
        <ul className="flex flex-col gap-2">
          {skipLinks.map((link, index) => (
            <li key={index}>
              <button
                onClick={link.action}
                className={cn(
                  'absolute top-4 left-4 z-50',
                  'bg-navy-900 text-white px-4 py-2 rounded-lg',
                  'font-medium transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                  'hover:bg-navy-800',
                  'transform -translate-y-full opacity-0',
                  'focus:translate-y-0 focus:opacity-100'
                )}
                style={{ top: `${1 + index * 3}rem` }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};