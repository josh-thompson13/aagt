'use client';

import { cn } from '@/utils/cn';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import type { ApplicationStep, FormProgress } from '@/types/application';

interface ProgressBarProps {
  steps: ApplicationStep[];
  progress: FormProgress;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const ProgressBar = ({ 
  steps, 
  progress, 
  onStepClick,
  className 
}: ProgressBarProps) => {
  const getStepStatus = (stepIndex: number) => {
    if (progress.completedSteps.includes(stepIndex)) {
      return 'completed';
    } else if (stepIndex === progress.currentStep) {
      return 'current';
    } else if (stepIndex < progress.currentStep) {
      return 'completed';
    } else {
      return 'upcoming';
    }
  };

  const canNavigateToStep = (stepIndex: number) => {
    // Can navigate to completed steps or current step
    return stepIndex <= progress.currentStep || progress.completedSteps.includes(stepIndex);
  };

  const handleStepClick = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex) && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  return (
    <nav 
      aria-label="Application progress"
      className={cn('w-full', className)}
    >
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Step {progress.currentStep + 1} of {progress.totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((progress.currentStep + 1) / progress.totalSteps) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${((progress.currentStep + 1) / progress.totalSteps) * 100}%` 
            }}
            role="progressbar"
            aria-valuenow={progress.currentStep + 1}
            aria-valuemin={0}
            aria-valuemax={progress.totalSteps}
            aria-label={`Progress: step ${progress.currentStep + 1} of ${progress.totalSteps}`}
          />
        </div>
        
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-900">
            {steps[progress.currentStep]?.title}
          </p>
          <p className="text-xs text-gray-500">
            {steps[progress.currentStep]?.description}
          </p>
        </div>
      </div>

      {/* Desktop Step Navigation */}
      <div className="hidden md:block">
        <ol className="flex items-center justify-between w-full">
          {steps.map((step, stepIndex) => {
            const status = getStepStatus(stepIndex);
            const isClickable = canNavigateToStep(stepIndex);
            
            return (
              <li
                key={step.id}
                className={cn(
                  'flex items-center',
                  stepIndex < steps.length - 1 && 'flex-1'
                )}
              >
                {/* Step Circle and Content */}
                <div
                  className={cn(
                    'flex flex-col items-center group',
                    isClickable && 'cursor-pointer'
                  )}
                  onClick={() => handleStepClick(stepIndex)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && isClickable) {
                      e.preventDefault();
                      handleStepClick(stepIndex);
                    }
                  }}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : -1}
                  aria-label={`${step.title}: ${status}`}
                >
                  {/* Step Icon */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200',
                      status === 'completed'
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : status === 'current'
                        ? 'bg-white border-teal-600 text-teal-600 ring-4 ring-teal-100'
                        : 'bg-white border-gray-300 text-gray-400',
                      isClickable && 'group-hover:border-teal-500 group-focus:border-teal-500',
                      !step.isCompleted && stepIndex === progress.currentStep && 'animate-pulse-soft'
                    )}
                  >
                    {status === 'completed' ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : status === 'current' ? (
                      <div className="w-3 h-3 bg-teal-600 rounded-full" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mt-2 text-center max-w-24">
                    <p
                      className={cn(
                        'text-xs font-medium transition-colors duration-200',
                        status === 'current'
                          ? 'text-teal-600'
                          : status === 'completed'
                          ? 'text-gray-900'
                          : 'text-gray-500',
                        isClickable && 'group-hover:text-teal-600'
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 hidden lg:block">
                      {step.description}
                    </p>
                  </div>

                  {/* Required Indicator */}
                  {step.isRequired && (
                    <div className="mt-1">
                      <span className="text-xs text-red-500">*</span>
                    </div>
                  )}
                </div>

                {/* Connector Line */}
                {stepIndex < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={cn(
                        'h-0.5 transition-colors duration-300',
                        stepIndex < progress.currentStep
                          ? 'bg-teal-600'
                          : 'bg-gray-300'
                      )}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Additional Progress Info */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="text-gray-600">
            <span className="font-medium">{progress.completedSteps.length}</span> of{' '}
            <span className="font-medium">{progress.totalSteps}</span> steps completed
          </div>
          
          <div className="text-gray-500">
            {Math.round((progress.completedSteps.length / progress.totalSteps) * 100)}% Complete
          </div>
        </div>
      </div>

      {/* Auto-save Status */}
      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Circle className="w-3 h-3 text-green-500 animate-pulse" />
          <span>Auto-saving your progress</span>
        </div>
      </div>
    </nav>
  );
};