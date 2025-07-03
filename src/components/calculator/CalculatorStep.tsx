'use client';

import { LoanCalculatorEngine } from '@/utils/calculatorEngine';
import type { 
  LoanCalculatorInput, 
  CalculatorStep as StepType 
} from '@/types/calculator';

interface Props {
  step: StepType;
  input: Partial<LoanCalculatorInput>;
  onInputChange: (field: keyof LoanCalculatorInput, value: any) => void;
}

export function CalculatorStep({ step, input, onInputChange }: Props) {
  const aagtRates = LoanCalculatorEngine.getAAGTRates();
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    }).format(value);
  };


  if (step.id === 0) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={input.loanAmount || ''}
              onChange={(e) => onInputChange('loanAmount', Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="500,000"
              min="150000"
              max="5000000"
              step="10000"
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Min: {formatCurrency(150000)} • Max: {formatCurrency(5000000)}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Purpose *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'business', label: 'Business Expansion', rate: aagtRates.business },
              { value: 'investment', label: 'Investment Property', rate: aagtRates.investment },
              { value: 'property', label: 'Property Development', rate: aagtRates.property },
              { value: 'working-capital', label: 'Working Capital', rate: aagtRates['working-capital'] }
            ].map((purpose) => (
              <label
                key={purpose.value}
                className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  input.loanPurpose === purpose.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="loanPurpose"
                  value={purpose.value}
                  checked={input.loanPurpose === purpose.value}
                  onChange={(e) => {
                    onInputChange('loanPurpose', e.target.value);
                    onInputChange('interestRate', purpose.rate);
                  }}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{purpose.label}</div>
                  <div className="text-sm text-primary-600 font-medium">
                    From {purpose.rate}% p.a.
                  </div>
                </div>
                {input.loanPurpose === purpose.value && (
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step.id === 1) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term *
            </label>
            <select
              value={input.loanTermMonths || ''}
              onChange={(e) => onInputChange('loanTermMonths', Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select term</option>
              <option value="12">1 year</option>
              <option value="24">2 years</option>
              <option value="36">3 years</option>
              <option value="60">5 years</option>
              <option value="120">10 years</option>
              <option value="180">15 years</option>
              <option value="240">20 years</option>
              <option value="300">25 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={input.interestRate || ''}
                onChange={(e) => onInputChange('interestRate', Number(e.target.value))}
                className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="8.95"
                min="5"
                max="25"
                step="0.01"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Rate varies by loan purpose and security
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { 
                value: 'property', 
                label: 'Property Security',
                description: 'Secured by real estate or property assets'
              },
              { 
                value: 'business-assets', 
                label: 'Business Assets',
                description: 'Secured by business equipment or assets'
              },
              { 
                value: 'personal-guarantee', 
                label: 'Personal Guarantee',
                description: 'Backed by personal guarantee'
              },
              { 
                value: 'other', 
                label: 'Other Security',
                description: 'Alternative security arrangements'
              }
            ].map((security) => (
              <label
                key={security.value}
                className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                  input.securityType === security.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="securityType"
                  value={security.value}
                  checked={input.securityType === security.value}
                  onChange={(e) => onInputChange('securityType', e.target.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{security.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{security.description}</div>
                </div>
                {input.securityType === security.value && (
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {input.securityType === 'property' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan to Value Ratio (LVR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={input.ltv || ''}
                onChange={(e) => onInputChange('ltv', Number(e.target.value))}
                className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="70"
                min="0"
                max="80"
                step="5"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Maximum LVR: 70% for investment, 80% for owner-occupied
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}