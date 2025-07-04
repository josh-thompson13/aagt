import { X } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { BaseComponentProps, Size } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import styles from './Modal.module.css';

export type ModalSize = Size | 'xxl' | 'full';

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  variant?: 'default' | 'glassmorphism';
  children?: React.ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      size = 'md',
      closeOnOverlay = true,
      closeOnEscape = true,
      showCloseButton = true,
      variant = 'default',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationState, setAnimationState] = useState<'entering' | 'exiting' | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
        setAnimationState('entering');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
          setAnimationState(null);
          setIsAnimating(false);
        }, 300);

        return () => clearTimeout(timer);
      } else if (animationState !== 'exiting') {
        // Restore body scroll
        document.body.style.overflow = '';
      }

      // No cleanup needed for the else branch
      return undefined;
    }, [isOpen, animationState]);

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape' && isOpen) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }

      return undefined;
    }, [isOpen, closeOnEscape]);

    const handleClose = () => {
      setIsAnimating(true);
      setAnimationState('exiting');

      setTimeout(() => {
        document.body.style.overflow = '';
        setAnimationState(null);
        setIsAnimating(false);
        onClose();
      }, 200);
    };

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlay && event.target === event.currentTarget) {
        handleClose();
      }
    };

    if (!isOpen && !isAnimating) {
      return null;
    }

    const overlayClasses = cn(styles.overlay, {
      [styles.entering || 'entering']: animationState === 'entering',
      [styles.exiting || 'exiting']: animationState === 'exiting',
    });

    const modalClasses = cn(
      styles.modal,
      styles[size as keyof typeof styles],
      {
        [styles.glassmorphism || 'glassmorphism']: variant === 'glassmorphism',
        [styles.entering || 'entering']: animationState === 'entering',
        [styles.exiting || 'exiting']: animationState === 'exiting',
      },
      className
    );

    const modalContent = (
      <div className={overlayClasses} onClick={handleOverlayClick}>
        <div ref={ref || modalRef} className={modalClasses} {...props}>
          {(title || showCloseButton) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {showCloseButton && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={handleClose}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          <div className={styles.body}>{children}</div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';

export interface ModalHeaderProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.header, className)} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export interface ModalBodyProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.body, className)} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.footer, className)} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
