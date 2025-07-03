import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils/cn';
import styles from './Notification.module.css';
import { Toast, type ToastProps } from './Toast';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastOptions extends Omit<ToastProps, 'onClose' | 'isVisible'> {
  id?: string;
  position?: ToastPosition;
}

export interface ToastContextType {
  showToast: (options: ToastOptions) => string;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ActiveToast extends ToastOptions {
  id: string;
  isVisible: boolean;
}

interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

const positionClasses = {
  'top-right': styles.topRight,
  'top-left': styles.topLeft,
  'top-center': styles.topCenter,
  'bottom-right': styles.bottomRight,
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
};

export const ToastProvider = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  const showToast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id || `toast-${Date.now()}-${Math.random()}`;

      const newToast: ActiveToast = {
        ...options,
        id,
        isVisible: true,
        position: options.position || position,
      };

      setToasts((currentToasts) => {
        const updatedToasts = [newToast, ...currentToasts];
        return updatedToasts.slice(0, maxToasts);
      });

      return id;
    },
    [position, maxToasts]
  );

  const hideToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.map((toast) => (toast.id === id ? { ...toast, isVisible: false } : toast))
    );

    // Remove toast after animation
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts((currentToasts) => currentToasts.map((toast) => ({ ...toast, isVisible: false })));

    setTimeout(() => {
      setToasts([]);
    }, 300);
  }, []);

  const value: ToastContextType = {
    showToast,
    hideToast,
    clearAllToasts,
  };

  // Group toasts by position
  const toastsByPosition = toasts.reduce(
    (acc, toast) => {
      const pos = toast.position || position;
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(toast);
      return acc;
    },
    {} as Record<ToastPosition, ActiveToast[]>
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {typeof window !== 'undefined' &&
        createPortal(
          <>
            {Object.entries(toastsByPosition).map(([pos, positionToasts]) => (
              <div
                key={pos}
                className={cn(styles.toastContainer, positionClasses[pos as ToastPosition])}
              >
                {positionToasts.map((toast) => (
                  <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
                ))}
              </div>
            ))}
          </>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

// Convenience functions
export const toast = {
  success: (message: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
    // This will be implemented when used within ToastProvider context
    console.warn('toast.success called outside of ToastProvider context');
  },
  error: (message: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
    console.warn('toast.error called outside of ToastProvider context');
  },
  warning: (message: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
    console.warn('toast.warning called outside of ToastProvider context');
  },
  info: (message: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
    console.warn('toast.info called outside of ToastProvider context');
  },
};
