import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { forwardRef } from 'react';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { Button } from '../Button';
import { Modal, ModalBody, ModalFooter } from './Modal';

export type DialogType = 'info' | 'success' | 'warning' | 'error';

export interface DialogProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  type?: DialogType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  variant?: 'default' | 'glassmorphism';
}

const dialogIcons = {
  info: <Info className="w-6 h-6 text-blue-500" />,
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
  error: <XCircle className="w-6 h-6 text-red-500" />,
};

const dialogColors = {
  info: 'text-blue-700',
  success: 'text-green-700',
  warning: 'text-yellow-700',
  error: 'text-red-700',
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isOpen,
      onClose,
      type = 'info',
      title,
      message,
      confirmText = 'OK',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      showCancel = false,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const handleConfirm = () => {
      onConfirm?.();
      onClose();
    };

    const handleCancel = () => {
      onCancel?.();
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        variant={variant}
        showCloseButton={false}
        {...props}
      >
        <ModalBody>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">{dialogIcons[type]}</div>

            <div className="flex-1">
              {title && (
                <h3 className={`text-lg font-semibold mb-2 ${dialogColors[type]}`}>{title}</h3>
              )}

              <p className="text-gray-700">{message}</p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          {showCancel && (
            <Button variant="ghost" onClick={handleCancel}>
              {cancelText}
            </Button>
          )}

          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
);

Dialog.displayName = 'Dialog';
