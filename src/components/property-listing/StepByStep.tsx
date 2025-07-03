'use client';

type Step = {
  id: number;
  title: string;
  description: string;
};

type StepByStepProps = {
  currentStep: number;
  steps: Step[];
  onStepChange: (step: number) => void;
};

export const StepByStep = ({ currentStep, steps, onStepChange }: StepByStepProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center cursor-pointer"
            onClick={() => onStepChange(step.id)}
          >
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${currentStep >= step.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}
            >
              {step.id}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  ml-6 w-16 h-0.5
                  ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};