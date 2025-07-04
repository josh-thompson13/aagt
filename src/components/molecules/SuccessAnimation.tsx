'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms';

interface SuccessAnimationProps {
  title: string;
  message: string;
  applicationId?: string;
  nextSteps?: string[];
  onContinue?: () => void;
  onViewApplication?: () => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

const sparkleVariants = {
  animate: {
    rotate: 360,
    scale: [1, 1.2, 1],
    transition: {
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
      scale: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const SuccessAnimation = ({
  title,
  message,
  applicationId,
  nextSteps = [],
  onContinue,
  onViewApplication,
  className,
}: SuccessAnimationProps) => {
  return (
    <motion.div
      variants={containerVariants as any}
      initial="hidden"
      animate="visible"
      className={cn(
        'relative bg-gradient-to-br from-success-50 to-teal-50',
        'rounded-2xl p-8 text-center max-w-2xl mx-auto',
        'border border-success-200 shadow-xl',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          variants={pulseVariants as any}
          animate="animate"
          className="absolute -top-4 -right-4 w-32 h-32 bg-success-200/30 rounded-full"
        />
        <motion.div
          variants={pulseVariants as any}
          animate="animate"
          className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-200/20 rounded-full"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Success Icon with sparkles */}
        <motion.div variants={itemVariants as any} className="relative mb-8 flex justify-center">
          <div className="relative">
            {/* Main success icon */}
            <motion.div variants={iconVariants as any} className="relative z-10">
              <CheckCircle className="h-24 w-24 text-success-500" />
            </motion.div>

            {/* Sparkle decorations */}
            <motion.div
              variants={sparkleVariants as any}
              animate="animate"
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="h-8 w-8 text-gold-400" />
            </motion.div>

            <motion.div
              variants={sparkleVariants as any}
              animate="animate"
              className="absolute -bottom-1 -left-3"
              style={{ animationDelay: '1s' }}
            >
              <Sparkles className="h-6 w-6 text-gold-300" />
            </motion.div>

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 -m-4 border-2 border-success-300 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={itemVariants as any} className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </motion.h1>

        {/* Message */}
        <motion.p
          variants={itemVariants as any}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Application ID */}
        {applicationId && (
          <motion.div
            variants={itemVariants as any}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-8 border border-success-200"
          >
            <p className="text-sm text-gray-600 mb-1">Your Application ID</p>
            <p className="text-xl font-mono font-bold text-gray-900 tracking-wider">
              {applicationId}
            </p>
            <p className="text-xs text-gray-500 mt-1">Please save this ID for your records</p>
          </motion.div>
        )}

        {/* Next Steps */}
        {nextSteps.length > 0 && (
          <motion.div
            variants={itemVariants as any}
            className="text-left bg-white/50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              What happens next?
            </h3>
            <ul className="space-y-3">
              {nextSteps.map((step, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants as any}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants as any}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {onViewApplication && (
            <Button
              variant="outline"
              onClick={onViewApplication}
              className="flex items-center justify-center space-x-2"
            >
              <span>View Application</span>
            </Button>
          )}

          {onContinue && (
            <Button
              variant="primary"
              onClick={onContinue}
              className="flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </motion.div>

        {/* Footer message */}
        <motion.div
          variants={itemVariants as any}
          className="mt-8 pt-6 border-t border-success-200"
        >
          <p className="text-sm text-gray-600">
            You will receive a confirmation email shortly with all the details.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
