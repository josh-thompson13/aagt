'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Calculator, DollarSign } from 'lucide-react';

interface QuickQuoteProps {
  className?: string;
  variant?: 'default' | 'compact';
  onApply?: () => void;
}

export default function QuickQuote({
  className = '',
  variant = 'default',
  onApply,
}: QuickQuoteProps) {
  const [loanAmount, setLoanAmount] = useState<string>('500000');
  const [loanTerm, setLoanTerm] = useState<string>('12');
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);
  const router = useRouter();

  // Interest rate (monthly) - typically 1.2% for private loans
  const monthlyRate = 0.012;

  useEffect(() => {
    calculateQuote();
  }, [loanAmount, loanTerm]);

  const calculateQuote = () => {
    const principal = parseFloat(loanAmount) || 0;
    const months = parseInt(loanTerm) || 1;

    if (principal >= 150000 && principal <= 5000000 && months >= 1 && months <= 24) {
      // Simple interest calculation for short-term loans
      const interest = principal * monthlyRate * months;
      const total = principal + interest;

      setTotalInterest(interest);
      setTotalRepayment(total);
    } else {
      setTotalInterest(0);
      setTotalRepayment(0);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setLoanAmount(value);
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    } else {
      // Pass the loan amount as a URL parameter
      const amount = parseInt(loanAmount) || 500000;
      router.push(`/apply?amount=${amount}`);
    }
  };

  const isCompact = variant === 'compact';

  const termOptions = Array.from({ length: 24 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} ${i === 0 ? 'month' : 'months'}`,
  }));

  return (
    <Card className={`${className} ${isCompact ? 'p-4' : ''}`}>
      <CardHeader className={isCompact ? 'pb-4' : ''}>
        <h3
          className={`flex items-center gap-2 ${isCompact ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}
        >
          <Calculator className={`${isCompact ? 'h-5 w-5' : 'h-6 w-6'} text-teal-600`} />
          Quick Quote
        </h3>
      </CardHeader>
      <CardBody className={`space-y-${isCompact ? '4' : '6'}`}>
        <div className="space-y-4">
          <Input
            label="Loan Amount"
            type="text"
            placeholder="Enter amount"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            helperText="Between $150,000 and $5,000,000"
            leftIcon={<DollarSign className="h-4 w-4" />}
          />

          <Select
            label="Loan Term (Months)"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            options={termOptions}
            placeholder="Select term"
          />
        </div>

        {totalRepayment > 0 && (
          <div className={`bg-gray-50 rounded-lg p-${isCompact ? '4' : '6'} space-y-3`}>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Interest</span>
              <span className="text-xl font-semibold">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Repayment</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRepayment)}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Based on {monthlyRate * 100}% monthly interest rate
            </p>
          </div>
        )}

        <Button onClick={handleApply} variant="primary" fullWidth size={isCompact ? 'md' : 'lg'}>
          Get Full Quote
        </Button>

        <p className="text-xs text-gray-500 text-center">
          This is an estimate only. Final rates and terms subject to approval.
        </p>
      </CardBody>
    </Card>
  );
}
