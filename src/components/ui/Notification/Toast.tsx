import { AlertTriangle, Bell, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import type { BaseComponentProps, Status } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Notification.module.css';

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface ToastProps extends BaseComponentProps {
  title?: string;
  description: string;
  variant?: Status;
  duration?: number;
  showCloseButton?: boolean;
  showProgress?: boolean;
  actions?: ToastAction[];
  onClose?: () => void;
  isVisible?: boolean;
}

const toastIcons = {
  default: <Bell className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      description,
      variant = 'default',
      duration = 5000,
      showCloseButton = true,
      showProgress = true,
      actions,
      onClose,
      isVisible = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationState, setAnimationState] = useState<'entering' | 'exiting' | null>(null);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
      if (isVisible) {
        setIsAnimating(true);
        setAnimationState('entering');

        const enterTimer = setTimeout(() => {
          setAnimationState(null);
          setIsAnimating(false);
        }, 300);

        return () => clearTimeout(enterTimer);
      }
    }, [isVisible]);

    useEffect(() => {
      if (isVisible && duration > 0) {
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, duration - elapsed);
          const newProgress = (remaining / duration) * 100;

          setProgress(newProgress);

          if (remaining <= 0) {
            clearInterval(interval);
            handleClose();
          }
        }, 50);

        return () => clearInterval(interval);
      }
    }, [isVisible, duration]);

    const handleClose = () => {
      setIsAnimating(true);
      setAnimationState('exiting');

      setTimeout(() => {
        setAnimationState(null);
        setIsAnimating(false);
        onClose?.();
      }, 300);
    };

    if (!isVisible && !isAnimating) {
      return null;
    }

    const toastClasses = cn(
      styles.toast,
      styles[variant],
      {
        [styles.entering]: animationState === 'entering',
        [styles.exiting]: animationState === 'exiting',
      },
      className
    );

    return (
      <div ref={ref} className={toastClasses} {...props}>
        <div className={styles.toastContent}>
          <div className={cn(styles.icon, styles[variant])}>{toastIcons[variant]}</div>

          <div className={styles.message}>
            {title && <div className={cn(styles.title, styles[variant])}>{title}</div>}

            <div className={cn(styles.description, styles[variant])}>{description}</div>

            {actions && actions.length > 0 && (
              <div className={styles.actions}>
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className={cn(styles.actionButton, styles[action.variant || 'secondary'])}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showCloseButton && (
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showProgress && duration > 0 && (
          <div
            className={cn(styles.progressBar, styles[variant])}
            style={{ width: `${progress}%` }}
          />
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
