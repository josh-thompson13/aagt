export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
export type Status = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
}

export interface ValidationProps {
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
}

export interface AnimationProps {
  animate?: boolean;
  duration?: number;
  delay?: number;
}