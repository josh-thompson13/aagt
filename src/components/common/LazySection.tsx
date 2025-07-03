'use client';

import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

const defaultFallback = (
  <div className="flex h-32 w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-navy-600" />
  </div>
);

export const LazySection = ({ 
  children, 
  fallback = defaultFallback,
  className 
}: LazySectionProps) => {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
};

// Higher-order component for lazy loading components
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>
) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return (props: P & { fallback?: ReactNode }) => {
    const { fallback = defaultFallback, ...componentProps } = props;
    
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...(componentProps as P)} />
      </Suspense>
    );
  };
};