'use client';

import { Crown, Clock, CheckCircle, XCircle } from 'lucide-react';
import { LoanCalculatorEngine } from '@/utils/calculatorEngine';
import type { LoanCalculatorInput, LoanCalculatorResult } from '@/types/calculator';

interface Props {
  aagtResult: LoanCalculatorResult;
  input: LoanCalculatorInput;
}

export function ComparisonView({ aagtResult, input }: Props) {
  const comparisonRates = LoanCalculatorEngine.getBankComparisonRates();
  const formatCurrency = LoanCalculatorEngine.formatCurrency;
  const formatPercentage = LoanCalculatorEngine.formatPercentage;

  const calculateBankPayment = (rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const factor = (1 + monthlyRate) ** input.loanTermMonths;
    return (input.loanAmount * monthlyRate * factor) / (factor - 1);
  };

  const features = [
    {
      feature: 'Same Day Approval',
      aagt: true,
      banks: false,
      aagtValue: '✓ Same Day',
      bankValue: '10-14 Days'
    },
    {
      feature: 'Fast Settlement',
      aagt: true,
      banks: false,
      aagtValue: '4 Days',
      bankValue: '30-45 Days'
    },
    {
      feature: 'Minimal Documentation',
      aagt: true,
      banks: false,
      aagtValue: 'Streamlined',
      bankValue: 'Extensive'
    },
    {
      feature: 'Committee Approval',
      aagt: false,
      banks: true,
      aagtValue: 'Direct Decision',
      bankValue: 'Committee Required'
    },
    {
      feature: 'Pre-approval Available',
      aagt: true,
      banks: true,
      aagtValue: '✓',
      bankValue: '✓'
    },
    {
      feature: 'Broker Friendly',
      aagt: true,
      banks: true,
      aagtValue: '✓ Full Commission',
      bankValue: 'Varies'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          How AAGT Compares to Major Banks
        </h3>
        <p className="text-gray-600">
          See the difference in rates, fees, and approval times
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Lender</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Interest Rate</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Comparison Rate</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Monthly Payment</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Total Cost</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Fees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonRates.map((rate, index) => {
                const monthlyPayment = rate.isAAGT 
                  ? aagtResult.monthlyPayment 
                  : calculateBankPayment(rate.comparisonRate);
                const totalCost = monthlyPayment * input.loanTermMonths;
                
                return (
                  <tr 
                    key={index}
                    className={rate.isAAGT ? 'bg-primary-50 border-primary-200' : 'bg-white'}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {rate.isAAGT && <Crown className="w-4 h-4 text-yellow-500" />}
                        <span className={`font-medium ${rate.isAAGT ? 'text-primary-900' : 'text-gray-900'}`}>
                          {rate.lender}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={rate.isAAGT ? 'text-primary-600 font-medium' : 'text-gray-900'}>
                        {formatPercentage(rate.rate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={rate.isAAGT ? 'text-primary-600 font-medium' : 'text-gray-900'}>
                        {formatPercentage(rate.comparisonRate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={rate.isAAGT ? 'text-primary-600 font-medium' : 'text-gray-900'}>
                        {formatCurrency(monthlyPayment)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={rate.isAAGT ? 'text-primary-600 font-medium' : 'text-gray-900'}>
                        {formatCurrency(totalCost)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-600">{formatCurrency(rate.fees)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">Feature Comparison</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-primary-600">
                  AAGT Private Loans
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Major Banks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{feature.feature}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {feature.aagt ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-sm ${feature.aagt ? 'text-green-700' : 'text-red-700'}`}>
                        {feature.aagtValue}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {feature.banks ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-sm ${feature.banks ? 'text-green-700' : 'text-red-700'}`}>
                        {feature.bankValue}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6" />
          <h4 className="text-lg font-semibold">Why Choose AAGT?</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold mb-1">Same Day</div>
            <div className="text-primary-100">Approval Decision</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">4 Days</div>
            <div className="text-primary-100">To Settlement</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">Direct</div>
            <div className="text-primary-100">Private Lender</div>
          </div>
        </div>
      </div>
    </div>
  );
}