'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AnimatedIcon } from '@/components/atoms/AnimatedIcon';
import { Button } from '@/components/atoms';

interface StatusAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  isVisible: boolean;
  onClose?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
  className?: string;
}

const alertVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const progressVariants = {
  initial: { width: '100%' },
  animate: (duration: number) => ({
    width: '0%',
    transition: {
      duration: duration / 1000,
      ease: 'linear',
    },
  }),
};

export const StatusAlert = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoHide = false,
  autoHideDelay = 5000,
  actions = [],
  className,
}: StatusAlertProps) => {
  const styles = {
    success: {
      container: 'bg-success-50 border-success-200 text-success-800',
      progress: 'bg-success-500',
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      progress: 'bg-red-500',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-800',
      progress: 'bg-amber-500',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      progress: 'bg-blue-500',
    },
  };

  const iconType = type === 'info' ? 'loading' : type;

  // Auto-hide functionality
  React.useEffect(() => {
    if (autoHide && isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, isVisible, onClose, autoHideDelay]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            'relative rounded-xl border-2 p-4 shadow-lg',
            styles[type].container,
            className
          )}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Auto-hide progress bar */}
          {autoHide && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-black/10 rounded-t-xl overflow-hidden"
            >
              <motion.div
                variants={progressVariants}
                initial="initial"
                animate="animate"
                custom={autoHideDelay}
                className={cn('h-full', styles[type].progress)}
              />
            </motion.div>
          )}

          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0 pt-0.5">
              <AnimatedIcon 
                type={iconType} 
                size="md" 
                animate={type === 'info'}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold mb-1">
                {title}
              </h3>
              
              {message && (
                <p className="text-sm opacity-90 mb-3">
                  {message}
                </p>
              )}

              {/* Actions */}
              {actions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={action.variant || 'outline'}
                      onClick={action.onClick}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Close button */}
            {onClose && (
              <button
                onClick={onClose}
                className={cn(
                  'flex-shrink-0 p-1 rounded-lg transition-colors',
                  'hover:bg-black/10 focus:bg-black/10 focus:outline-none',
                  'focus:ring-2 focus:ring-offset-2 focus:ring-current'
                )}
                aria-label="Close alert"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};