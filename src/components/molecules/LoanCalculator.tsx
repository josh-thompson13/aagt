'use client';

import { useState } from 'react';
import { Button, Card, Input } from '@/components/atoms';
import { formatCurrency } from '@/utils/format';

interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

export const LoanCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateLoan = async () => {
    if (!amount || !rate || !term) return;

    setLoading(true);
    
    try {
      const response = await fetch('/api/calculate-loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          rate: parseFloat(rate),
          term: parseInt(term, 10),
        }),
      });

      if (!response.ok) throw new Error('Calculation failed');

      const result = await response.json();
      setCalculation(result);
    } catch (error) {
      console.error('Loan calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-navy-900 mb-6">Loan Calculator</h3>
      
      <div className="space-y-4">
        <Input
          label="Loan Amount"
          type="number"
          placeholder="150000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <Input
          label="Interest Rate (%)"
          type="number"
          step="0.01"
          placeholder="8.5"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        
        <Input
          label="Term (months)"
          type="number"
          placeholder="12"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <Button
          onClick={calculateLoan}
          loading={loading}
          disabled={!amount || !rate || !term}
          className="w-full"
        >
          Calculate
        </Button>
      </div>

      {calculation && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Results</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Payment:</span>
              <span className="font-medium text-navy-900">
                {formatCurrency(calculation.monthlyPayment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interest:</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(calculation.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-navy-900">
                {formatCurrency(calculation.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};