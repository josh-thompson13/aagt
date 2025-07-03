'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

// Route-based transition configurations
const routeTransitions = {
  default: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  slide: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  calculator: {
    initial: { opacity: 0, rotateX: 90, transformPerspective: 1000 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  modal: {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 },
    transition: { 
      duration: 0.4, 
      ease: [0.34, 1.56, 0.64, 1],
      opacity: { duration: 0.3 }
    }
  }
};

// Get transition type based on route
const getTransitionType = (pathname: string): keyof typeof routeTransitions => {
  if (pathname.includes('/calculator')) return 'calculator';
  if (pathname.includes('/apply') || pathname.includes('/contact')) return 'slide';
  if (pathname.includes('/loan') || pathname.includes('/rate')) return 'scale';
  return 'default';
};

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const transitionType = getTransitionType(pathname);
  const config = routeTransitions[transitionType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={config.initial}
        animate={config.animate}
        exit={config.exit}
        transition={config.transition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Loading transition with app-like feel
export const LoadingTransition = ({ isLoading, children }: { isLoading: boolean; children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.h3
              className="text-lg font-semibold text-primary-900"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Loading...
            </motion.h3>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Stagger container for animating lists
export const StaggerContainer = ({ 
  children, 
  className = '',
  delay = 0,
  staggerDelay = 0.1 
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ 
  children, 
  className = '',
  direction = 'up'
}: { 
  children: ReactNode; 
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const directionVariants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: directionVariants[direction],
        visible: {
          y: 0,
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Slide up modal transition
export const ModalTransition = ({ 
  isOpen, 
  children, 
  onClose 
}: { 
  isOpen: boolean; 
  children: ReactNode;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: 0.4
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Card flip transition
export const FlipCard = ({ 
  front, 
  back, 
  isFlipped 
}: { 
  front: ReactNode; 
  back: ReactNode; 
  isFlipped: boolean; 
}) => {
  return (
    <motion.div
      className="relative w-full h-full [perspective:1000px]"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front */}
      <motion.div
        className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
        style={{ transform: 'rotateY(0deg)' }}
      >
        {front}
      </motion.div>

      {/* Back */}
      <motion.div
        className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
        style={{ transform: 'rotateY(180deg)' }}
      >
        {back}
      </motion.div>
    </motion.div>
  );
};

// Pull to refresh transition
export const PullToRefresh = ({ 
  onRefresh, 
  children 
}: { 
  onRefresh: () => void; 
  children: ReactNode; 
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  return (
    <motion.div
      className="relative overflow-hidden"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.3, bottom: 0 }}
      onDrag={(event, info) => {
        if (info.offset.y > 0) {
          setPullDistance(Math.min(info.offset.y, 100));
          setIsPulling(info.offset.y > 50);
        }
      }}
      onDragEnd={(event, info) => {
        if (info.offset.y > 50) {
          onRefresh();
        }
        setPullDistance(0);
        setIsPulling(false);
      }}
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center py-4 text-gray-500"
        initial={{ y: -60, opacity: 0 }}
        animate={{ 
          y: pullDistance > 20 ? -20 : -60, 
          opacity: pullDistance > 20 ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`w-8 h-8 border-2 border-gray-400 rounded-full ${
            isPulling ? 'border-t-teal-600' : ''
          }`}
          animate={{ rotate: isPulling ? 360 : 0 }}
          transition={{ duration: 1, repeat: isPulling ? Infinity : 0, ease: 'linear' }}
        />
      </motion.div>

      {children}
    </motion.div>
  );
};

// Tab transition with native feel
export const TabTransition = ({ 
  activeTab, 
  tabs 
}: { 
  activeTab: number; 
  tabs: ReactNode[]; 
}) => {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full"
        >
          {tabs[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Haptic feedback simulation
export const useHapticFeedback = () => {
  const vibrate = (pattern: number | number[] = 50) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const lightTap = () => vibrate(25);
  const mediumTap = () => vibrate(50);
  const heavyTap = () => vibrate([50, 50, 50]);
  const success = () => vibrate([100, 50, 100]);
  const error = () => vibrate([200, 100, 200, 100, 200]);

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    success,
    error,
  };
};