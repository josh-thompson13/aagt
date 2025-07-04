'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { AnimatedIcon } from '@/components/atoms/AnimatedIcon';

interface LoadingOverlayProps {
  isVisible: boolean;
  title?: string;
  message?: string;
  progress?: number;
  className?: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export const LoadingOverlay = ({
  isVisible,
  title = 'Processing...',
  message,
  progress,
  className,
}: LoadingOverlayProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={overlayVariants as any}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center',
            'bg-black/60 backdrop-blur-sm',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="loading-title"
          aria-describedby="loading-message"
        >
          <motion.div
            variants={contentVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center"
          >
            {/* Loading Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <AnimatedIcon type="loading" size="xl" className="text-teal-600" />

                {/* Pulse ring effect */}
                <div className="absolute inset-0 -m-2">
                  <motion.div
                    className="w-full h-full border-2 border-teal-200 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                <div className="absolute inset-0 -m-4">
                  <motion.div
                    className="w-full h-full border border-teal-100 rounded-full"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 id="loading-title" className="text-xl font-semibold text-gray-900 mb-3">
              {title}
            </h2>

            {/* Message */}
            {message && (
              <p id="loading-message" className="text-gray-600 mb-6 text-sm leading-relaxed">
                {message}
              </p>
            )}

            {/* Progress Bar */}
            {typeof progress === 'number' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-teal-600 h-full rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Animated dots for indeterminate progress */}
            {typeof progress !== 'number' && (
              <div className="flex justify-center space-x-1 mt-4">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-teal-600 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
