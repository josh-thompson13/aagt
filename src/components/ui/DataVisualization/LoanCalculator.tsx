import { Calculator, Download, Share } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from '../Card';
import { Input, Select } from '../Form';

export interface LoanCalculation {
  principal: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

export interface LoanCalculatorProps extends BaseComponentProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTerm?: number;
  onCalculate?: (calculation: LoanCalculation) => void;
  variant?: 'default' | 'glassmorphism';
}

export const LoanCalculator = forwardRef<HTMLDivElement, LoanCalculatorProps>(
  (
    {
      defaultAmount = 500000,
      defaultRate = 5.5,
      defaultTerm = 5,
      onCalculate,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [amount, setAmount] = useState(defaultAmount);
    const [rate, setRate] = useState(defaultRate);
    const [term, setTerm] = useState(defaultTerm);
    const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

    const calculateLoan = () => {
      const principal = amount;
      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = term * 12;

      if (monthlyRate === 0) {
        // Handle 0% interest rate
        const monthlyPayment = principal / numberOfPayments;
        const totalInterest = 0;
        const totalAmount = principal;

        return {
          principal,
          monthlyPayment,
          totalInterest,
          totalAmount,
        };
      }

      const monthlyPayment =
        (principal * monthlyRate * (1 + monthlyRate) ** numberOfPayments) /
        ((1 + monthlyRate) ** numberOfPayments - 1);

      const totalAmount = monthlyPayment * numberOfPayments;
      const totalInterest = totalAmount - principal;

      return {
        principal,
        monthlyPayment,
        totalInterest,
        totalAmount,
      };
    };

    useEffect(() => {
      if (amount > 0 && rate >= 0 && term > 0) {
        const calc = calculateLoan();
        setCalculation(calc);
        onCalculate?.(calc);
      }
    }, [amount, rate, term, onCalculate]);

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    const termOptions = [
      { value: '1', label: '1 Year' },
      { value: '2', label: '2 Years' },
      { value: '3', label: '3 Years' },
      { value: '5', label: '5 Years' },
      { value: '7', label: '7 Years' },
      { value: '10', label: '10 Years' },
      { value: '15', label: '15 Years' },
      { value: '20', label: '20 Years' },
      { value: '25', label: '25 Years' },
      { value: '30', label: '30 Years' },
    ];

    return (
      <Card ref={ref} variant={variant} className={cn('w-full max-w-2xl', className)} {...props}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0891B2]/10 rounded-lg">
              <Calculator className="w-5 h-5 text-[#0891B2]" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2540]">Loan Calculator</h3>
          </div>
        </CardHeader>

        <CardBody>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Loan Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="500000"
              />

              <Input
                label="Interest Rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                placeholder="5.5"
              />

              <Select
                label="Loan Term"
                value={term.toString()}
                onChange={(e) => setTerm(Number(e.target.value))}
                options={termOptions}
              />
            </div>

            {calculation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-[#0891B2]/5 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                    <div className="text-2xl font-bold text-[#0A2540]">
                      {formatCurrency(calculation.monthlyPayment)}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                    <div className="text-xl font-semibold text-gray-700">
                      {formatCurrency(calculation.totalInterest)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                    <div className="text-xl font-semibold text-gray-700">
                      {formatCurrency(calculation.totalAmount)}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">Interest Rate</div>
                    <div className="text-xl font-semibold text-green-700">
                      {rate.toFixed(2)}% p.a.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {calculation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Calculation Summary</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    <strong>Loan Amount:</strong> {formatCurrency(amount)}
                  </p>
                  <p>
                    <strong>Interest Rate:</strong> {rate}% per annum
                  </p>
                  <p>
                    <strong>Loan Term:</strong> {term} years ({term * 12} payments)
                  </p>
                  <p>
                    <strong>Total Interest Paid:</strong>{' '}
                    {formatCurrency(calculation.totalInterest)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardBody>

        <CardFooter>
          <div className="flex gap-3 w-full">
            <Button variant="outline" className="flex-1">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="primary" className="flex-1">
              Apply Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

LoanCalculator.displayName = 'LoanCalculator';
