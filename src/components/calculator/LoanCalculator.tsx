'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, ArrowLeft, Save, Share2, Download } from 'lucide-react';
import { LoanCalculatorEngine } from '@/utils/calculatorEngine';
import { ProgressTracker } from './ProgressTracker';
import { CalculatorStep } from './CalculatorStep';
import { ResultsView } from './ResultsView';
import { ComparisonView } from './ComparisonView';
import { ChartVisualization } from './ChartVisualization';
import type { 
  LoanCalculatorInput, 
  LoanCalculatorResult, 
  CalculatorStep as StepType,
  SavedCalculation 
} from '@/types/calculator';

interface Props {
  variant?: 'default' | 'compact' | 'embedded';
  onSave?: (calculation: SavedCalculation) => void;
  onShare?: (calculation: SavedCalculation) => void;
  className?: string;
}

export function LoanCalculator({ variant = 'default', onSave, onShare, className = '' }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState<Partial<LoanCalculatorInput>>({
    loanAmount: 500000,
    interestRate: 8.95,
    loanTermMonths: 240,
    loanPurpose: 'business',
    securityType: 'property'
  });
  const [result, setResult] = useState<LoanCalculatorResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const steps: StepType[] = [
    {
      id: 0,
      title: 'Loan Details',
      description: 'Enter your loan amount and purpose',
      completed: false,
      fields: ['loanAmount', 'loanPurpose']
    },
    {
      id: 1,
      title: 'Terms & Security',
      description: 'Set your loan term and security type',
      completed: false,
      fields: ['loanTermMonths', 'securityType', 'interestRate']
    },
    {
      id: 2,
      title: 'Results',
      description: 'Review your loan calculations',
      completed: false,
      fields: []
    }
  ];

  const calculateLoan = useCallback(() => {
    const validationErrors = LoanCalculatorEngine.validateInput(input);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0 && input.loanAmount && input.interestRate && input.loanTermMonths) {
      setIsCalculating(true);
      setTimeout(() => {
        const calculatedResult = LoanCalculatorEngine.calculateLoan(input as LoanCalculatorInput);
        setResult(calculatedResult);
        setIsCalculating(false);
      }, 500);
    }
  }, [input]);

  useEffect(() => {
    if (currentStep === 2) {
      calculateLoan();
    }
  }, [currentStep, calculateLoan]);

  const handleInputChange = (field: keyof LoanCalculatorInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
    
    if (currentStep === 2) {
      calculateLoan();
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = () => {
    if (result && input.loanAmount) {
      const calculation: SavedCalculation = {
        id: Date.now().toString(),
        input: input as LoanCalculatorInput,
        result,
        timestamp: new Date()
      };
      
      const saved = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
      saved.push(calculation);
      localStorage.setItem('savedCalculations', JSON.stringify(saved));
      
      onSave?.(calculation);
    }
  };

  const handleShare = () => {
    if (result && input.loanAmount) {
      const params = new URLSearchParams({
        amount: input.loanAmount.toString(),
        rate: input.interestRate?.toString() || '',
        term: input.loanTermMonths?.toString() || '',
        purpose: input.loanPurpose || '',
        security: input.securityType || ''
      });
      
      const shareUrl = `${window.location.origin}/calculator?${params.toString()}`;
      navigator.clipboard.writeText(shareUrl);
      
      const calculation: SavedCalculation = {
        id: Date.now().toString(),
        input: input as LoanCalculatorInput,
        result,
        timestamp: new Date()
      };
      
      onShare?.(calculation);
    }
  };

  const isCompactView = variant === 'compact' || variant === 'embedded';

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            AAGT Private Loans Calculator
          </h2>
        </div>
      </div>

      {!isCompactView && (
        <div className="px-6 py-4 border-b border-gray-200">
          <ProgressTracker 
            steps={steps} 
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
      )}

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep < 2 ? (
              <CalculatorStep
                step={steps[currentStep]}
                input={input}
                onInputChange={handleInputChange}
              />
            ) : (
              <div className="space-y-6">
                {isCalculating ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
                    <span className="ml-3 text-gray-600">Calculating your loan...</span>
                  </div>
                ) : result ? (
                  <>
                    <ResultsView 
                      input={input as LoanCalculatorInput}
                      result={result}
                      variant={variant}
                    />
                    
                    {!isCompactView && (
                      <>
                        <ChartVisualization 
                          result={result}
                          input={input as LoanCalculatorInput}
                        />
                        
                        <div className="flex gap-4">
                          <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="flex-1 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                          >
                            {showComparison ? 'Hide' : 'Show'} Bank Comparison
                          </button>
                        </div>
                        
                        {showComparison && (
                          <ComparisonView 
                            aagtResult={result}
                            input={input as LoanCalculatorInput}
                          />
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {errors.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep === 2 && result && (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </>
            )}
            
            {currentStep < 2 && (
              <button
                onClick={nextStep}
                disabled={errors.length > 0}
                className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}