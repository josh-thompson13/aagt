'use client';

import { CheckCircle, Circle } from 'lucide-react';
import type { CalculatorStep } from '@/types/calculator';

interface Props {
  steps: CalculatorStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressTracker({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div 
            className={`flex items-center gap-3 cursor-pointer group ${
              onStepClick ? 'hover:opacity-80' : ''
            }`}
            onClick={() => onStepClick?.(index)}
          >
            <div className="flex items-center gap-2">
              {index < currentStep ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : index === currentStep ? (
                <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{index + 1}</span>
                </div>
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              
              <div className="text-left">
                <div className={`font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>
                <div className={`text-sm ${
                  index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </div>
              </div>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`h-px w-16 mx-4 ${
              index < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}