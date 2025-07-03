'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Loader, Upload, Download } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AnimatedIconProps {
  type: 'success' | 'error' | 'warning' | 'loading' | 'upload' | 'download';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const iconVariants = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      duration: 0.6,
    }
  },
  exit: { 
    scale: 0, 
    rotate: 180, 
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  }
};

const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }
  }
};

const bounceVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  }
};

export const AnimatedIcon = ({ 
  type, 
  size = 'md', 
  className, 
  animate = true 
}: AnimatedIconProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const colors = {
    success: 'text-success-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    loading: 'text-teal-600',
    upload: 'text-blue-500',
    download: 'text-purple-500',
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'warning':
        return AlertCircle;
      case 'loading':
        return Loader;
      case 'upload':
        return Upload;
      case 'download':
        return Download;
      default:
        return CheckCircle;
    }
  };

  const Icon = getIcon();

  const getAnimation = () => {
    if (!animate) return {};
    
    switch (type) {
      case 'loading':
        return spinVariants;
      case 'success':
        return pulseVariants;
      case 'upload':
      case 'download':
        return bounceVariants;
      default:
        return iconVariants;
    }
  };

  return (
    <motion.div
      variants={iconVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center"
    >
      <motion.div
        variants={getAnimation()}
        animate={animate ? 'animate' : undefined}
      >
        <Icon 
          className={cn(
            sizes[size],
            colors[type],
            className
          )}
        />
      </motion.div>
    </motion.div>
  );
};