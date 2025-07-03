import type { 
  LoanCalculatorInput, 
  LoanCalculatorResult, 
  AmortizationEntry,
  ComparisonRate 
} from '@/types/calculator';

export class LoanCalculatorEngine {
  static calculateLoan(input: LoanCalculatorInput): LoanCalculatorResult {
    const { loanAmount, interestRate, loanTermMonths } = input;
    
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = LoanCalculatorEngine.calculateMonthlyPayment(loanAmount, monthlyRate, loanTermMonths);
    const totalAmount = monthlyPayment * loanTermMonths;
    const totalInterest = totalAmount - loanAmount;
    const effectiveRate = LoanCalculatorEngine.calculateEffectiveRate(input);
    
    const amortizationSchedule = LoanCalculatorEngine.generateAmortizationSchedule(
      loanAmount, 
      monthlyRate, 
      monthlyPayment, 
      loanTermMonths
    );

    return {
      monthlyPayment,
      totalInterest,
      totalAmount,
      amortizationSchedule,
      effectiveRate
    };
  }

  private static calculateMonthlyPayment(
    principal: number, 
    monthlyRate: number, 
    termMonths: number
  ): number {
    if (monthlyRate === 0) {
      return principal / termMonths;
    }
    
    const factor = (1 + monthlyRate) ** termMonths;
    return (principal * monthlyRate * factor) / (factor - 1);
  }

  private static generateAmortizationSchedule(
    principal: number,
    monthlyRate: number,
    monthlyPayment: number,
    termMonths: number
  ): AmortizationEntry[] {
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }

    return schedule;
  }

  private static calculateEffectiveRate(input: LoanCalculatorInput): number {
    const baseFees = LoanCalculatorEngine.getBaseFees(input);
    const totalFees = baseFees.establishment + baseFees.legal + baseFees.valuation;
    const netLoanAmount = input.loanAmount - totalFees;
    
    if (netLoanAmount <= 0) return input.interestRate;
    
    const feeImpact = (totalFees / netLoanAmount) * 100;
    return input.interestRate + (feeImpact / (input.loanTermMonths / 12));
  }

  private static getBaseFees(input: LoanCalculatorInput): {
    establishment: number;
    legal: number;
    valuation: number;
  } {
    const loanAmount = input.loanAmount;
    
    return {
      establishment: Math.min(loanAmount * 0.01, 5000),
      legal: Math.min(loanAmount * 0.005, 2500),
      valuation: input.securityType === 'property' ? 800 : 500
    };
  }

  static getAAGTRates(): Record<string, number> {
    return {
      business: 8.95,
      investment: 9.25,
      property: 8.75,
      'working-capital': 9.45
    };
  }

  static getBankComparisonRates(): ComparisonRate[] {
    return [
      {
        lender: 'AAGT Private Loans',
        rate: 8.95,
        fees: 1500,
        comparisonRate: 9.12,
        isAAGT: true
      },
      {
        lender: 'CBA Business',
        rate: 7.25,
        fees: 3500,
        comparisonRate: 7.58,
        isAAGT: false
      },
      {
        lender: 'ANZ Business',
        rate: 7.45,
        fees: 3200,
        comparisonRate: 7.74,
        isAAGT: false
      },
      {
        lender: 'NAB Business',
        rate: 7.35,
        fees: 3800,
        comparisonRate: 7.71,
        isAAGT: false
      },
      {
        lender: 'Westpac Business',
        rate: 7.55,
        fees: 3600,
        comparisonRate: 7.89,
        isAAGT: false
      }
    ];
  }

  static calculateSavingsVsBanks(
    aagtResult: LoanCalculatorResult,
    input: LoanCalculatorInput
  ): {
    avgBankPayment: number;
    monthlySavings: number;
    timeToApprovalDays: number;
    settlementDays: number;
  } {
    const bankRates = LoanCalculatorEngine.getBankComparisonRates().filter(rate => !rate.isAAGT);
    const avgBankRate = bankRates.reduce((sum, rate) => sum + rate.comparisonRate, 0) / bankRates.length;
    
    const bankMonthlyPayment = LoanCalculatorEngine.calculateMonthlyPayment(
      input.loanAmount,
      avgBankRate / 100 / 12,
      input.loanTermMonths
    );

    return {
      avgBankPayment: bankMonthlyPayment,
      monthlySavings: bankMonthlyPayment - aagtResult.monthlyPayment,
      timeToApprovalDays: 1,
      settlementDays: 4
    };
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  static formatPercentage(rate: number): string {
    return `${rate.toFixed(2)}%`;
  }

  static validateInput(input: Partial<LoanCalculatorInput>): string[] {
    const errors: string[] = [];

    if (!input.loanAmount || input.loanAmount < 150000) {
      errors.push('Loan amount must be at least $150,000');
    }
    if (!input.loanAmount || input.loanAmount > 5000000) {
      errors.push('Loan amount cannot exceed $5,000,000');
    }
    if (!input.interestRate || input.interestRate < 5 || input.interestRate > 25) {
      errors.push('Interest rate must be between 5% and 25%');
    }
    if (!input.loanTermMonths || input.loanTermMonths < 1 || input.loanTermMonths > 300) {
      errors.push('Loan term must be between 1 and 300 months');
    }
    if (!input.loanPurpose) {
      errors.push('Loan purpose is required');
    }
    if (!input.securityType) {
      errors.push('Security type is required');
    }

    return errors;
  }
}