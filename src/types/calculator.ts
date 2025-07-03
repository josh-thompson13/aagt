export interface LoanCalculatorInput {
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
  loanPurpose: 'business' | 'investment' | 'property' | 'working-capital';
  securityType: 'property' | 'business-assets' | 'personal-guarantee' | 'other';
  ltv?: number;
}

export interface LoanCalculatorResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: AmortizationEntry[];
  effectiveRate: number;
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface ComparisonRate {
  lender: string;
  rate: number;
  fees: number;
  comparisonRate: number;
  isAAGT: boolean;
}

export interface SavedCalculation {
  id: string;
  input: LoanCalculatorInput;
  result: LoanCalculatorResult;
  timestamp: Date;
  name?: string;
}

export interface CalculatorStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  fields: string[];
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trafficPercentage: number;
}

export interface RateUpdateResponse {
  rates: {
    business: number;
    investment: number;
    property: number;
    workingCapital: number;
  };
  lastUpdated: string;
  comparisonRates: ComparisonRate[];
}