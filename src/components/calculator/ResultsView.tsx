'use client';

import { TrendingUp, Clock, Shield, DollarSign } from 'lucide-react';
import { LoanCalculatorEngine } from '@/utils/calculatorEngine';
import type { LoanCalculatorInput, LoanCalculatorResult } from '@/types/calculator';

interface Props {
  input: LoanCalculatorInput;
  result: LoanCalculatorResult;
  variant?: 'default' | 'compact' | 'embedded';
}

export function ResultsView({ input, result, variant = 'default' }: Props) {
  const bankComparison = LoanCalculatorEngine.calculateSavingsVsBanks(result, input);
  const formatCurrency = LoanCalculatorEngine.formatCurrency;
  const formatPercentage = LoanCalculatorEngine.formatPercentage;
  
  const isCompact = variant === 'compact' || variant === 'embedded';

  const keyMetrics = [
    {
      icon: DollarSign,
      label: 'Monthly Payment',
      value: formatCurrency(result.monthlyPayment),
      sublabel: `${formatCurrency(result.monthlyPayment * 12)} annually`,
      color: 'primary'
    },
    {
      icon: TrendingUp,
      label: 'Total Interest',
      value: formatCurrency(result.totalInterest),
      sublabel: `${formatPercentage((result.totalInterest / input.loanAmount) * 100)} of loan`,
      color: 'secondary'
    },
    {
      icon: Clock,
      label: 'Approval Time',
      value: `${bankComparison.timeToApprovalDays} day`,
      sublabel: `${bankComparison.settlementDays} day settlement`,
      color: 'green'
    },
    {
      icon: Shield,
      label: 'Effective Rate',
      value: formatPercentage(result.effectiveRate),
      sublabel: `${formatPercentage(input.interestRate)} base rate`,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Your Loan Summary
        </h3>
        <p className="text-gray-600">
          {formatCurrency(input.loanAmount)} over {Math.floor(input.loanTermMonths / 12)} years
        </p>
      </div>

      <div className={`grid ${isCompact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
              </div>
              <span className="text-sm font-medium text-gray-600">{metric.label}</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.sublabel}</div>
            </div>
          </div>
        ))}
      </div>

      {!isCompact && bankComparison.monthlySavings !== 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h4 className="text-lg font-semibold text-green-900">
              Potential Savings vs Major Banks
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-green-600 font-medium">Monthly Difference</div>
              <div className="text-2xl font-bold text-green-900">
                {bankComparison.monthlySavings > 0 ? '+' : ''}{formatCurrency(Math.abs(bankComparison.monthlySavings))}
              </div>
              <div className="text-sm text-green-600">
                {bankComparison.monthlySavings > 0 ? 'Higher payment' : 'Savings'}
              </div>
            </div>
            <div>
              <div className="text-sm text-green-600 font-medium">Approval Speed</div>
              <div className="text-2xl font-bold text-green-900">10x Faster</div>
              <div className="text-sm text-green-600">vs 10-14 bank days</div>
            </div>
            <div>
              <div className="text-sm text-green-600 font-medium">Settlement</div>
              <div className="text-2xl font-bold text-green-900">4 Days</div>
              <div className="text-sm text-green-600">vs 30-45 bank days</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Principal Amount</span>
              <span className="font-medium">{formatCurrency(input.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate</span>
              <span className="font-medium">{formatPercentage(input.interestRate)} p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Term</span>
              <span className="font-medium">{Math.floor(input.loanTermMonths / 12)} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Security Type</span>
              <span className="font-medium capitalize">{input.securityType.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Repayments</span>
              <span className="font-medium">{formatCurrency(result.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-medium">{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Effective Rate</span>
              <span className="font-medium">{formatPercentage(result.effectiveRate)} p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Payment</span>
              <span className="font-medium text-primary-600">{formatCurrency(result.monthlyPayment)}</span>
            </div>
          </div>
        </div>
      </div>

      {!isCompact && (
        <div className="text-center">
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
            Apply for This Loan
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Get same-day approval with minimal documentation
          </p>
        </div>
      )}
    </div>
  );
}