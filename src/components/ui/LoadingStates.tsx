'use client';

import { motion } from 'framer-motion';
import { Loader2, TrendingUp } from 'lucide-react';

// Generic Skeleton Component
export const Skeleton = ({
  className = '',
  variant = 'default',
  animate = true,
}: {
  className?: string;
  variant?: 'default' | 'circular' | 'text' | 'button';
  animate?: boolean;
}) => {
  const baseClasses =
    'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';

  const variantClasses = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
    button: 'rounded-xl h-12',
  };

  const skeletonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={skeletonClasses}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  return <div className={skeletonClasses} />;
};

// Card Skeleton for feature cards
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 animate-pulse">
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton variant="circular" className="w-16 h-16" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton variant="circular" className="w-6 h-6" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Section Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
      <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-6" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-5/6 mx-auto mb-8" />
          <Skeleton className="h-6 w-4/6 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl">
              <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-4" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-6 w-64 mx-auto" />
          <Skeleton variant="button" className="w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton variant="button" className="w-full" />
        </div>
      </div>
    </div>
  );
};

// Trust Indicators Skeleton
export const TrustIndicatorsSkeleton = () => {
  return (
    <div className="py-24 bg-gray-50 animate-pulse">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border-2 border-gray-200">
              <Skeleton variant="circular" className="w-16 h-16 mb-6" />
              <Skeleton className="h-12 w-20 mb-2" />
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border-2 border-gray-200 text-center">
              <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-6" />
              <Skeleton className="h-6 w-32 mx-auto mb-3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Features Grid Skeleton
export const FeaturesGridSkeleton = () => {
  return (
    <div className="py-24 bg-white animate-pulse">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Skeleton className="h-8 w-32 mx-auto mb-8" />
          <Skeleton className="h-16 w-full max-w-4xl mx-auto mb-6" />
          <Skeleton className="h-6 w-full max-w-4xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading Spinner with AAGT branding
export const LoadingSpinner = ({
  size = 'default',
  message = 'Loading your funding solutions...',
}: {
  size?: 'small' | 'default' | 'large';
  message?: string;
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className={`${sizeClasses[size]} border-4 border-teal-200 border-t-teal-600 rounded-full`}
        />
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-r-primary-600 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {message && (
        <motion.p
          className="text-gray-600 font-medium"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

// Calculator Loading State
export const CalculatorLoading = () => {
  return (
    <motion.div
      className="flex items-center justify-center p-8 bg-gradient-to-br from-teal-50 to-primary-50 rounded-2xl border border-teal-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className="p-3 bg-teal-100 rounded-lg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <TrendingUp className="h-6 w-6 text-teal-700" />
        </motion.div>
        <div>
          <motion.div
            className="flex space-x-1 mb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 bg-teal-600 rounded-full"
                variants={{
                  hidden: { opacity: 0.3 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                  },
                }}
              />
            ))}
          </motion.div>
          <p className="text-sm font-medium text-gray-700">Calculating your quote...</p>
        </div>
      </div>
    </motion.div>
  );
};

// Page Transition Loading
export const PageTransitionLoading = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          className="w-20 h-20 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.h3
          className="text-xl font-semibold text-primary-900 mb-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.h3>
        <motion.p
          className="text-gray-600"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Preparing your funding solutions
        </motion.p>
      </div>
    </motion.div>
  );
};

// Error State Component
export const ErrorState = ({
  title = 'Something went wrong',
  message = "We're having trouble loading this content. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) => {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="px-6 py-3 bg-primary-900 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};
