import { LoanCalculatorEngine } from '@/utils/calculatorEngine';
import type { LoanCalculatorInput } from '@/types/calculator';

describe('LoanCalculatorEngine', () => {
  const mockInput: LoanCalculatorInput = {
    loanAmount: 500000,
    interestRate: 8.95,
    loanTermMonths: 240,
    loanPurpose: 'business',
    securityType: 'property'
  };

  describe('calculateLoan', () => {
    it('should calculate monthly payment correctly', () => {
      const result = LoanCalculatorEngine.calculateLoan(mockInput);
      
      // Expected monthly payment for $500k at 8.95% over 20 years
      expect(result.monthlyPayment).toBeCloseTo(4517.84, 2);
    });

    it('should calculate total interest correctly', () => {
      const result = LoanCalculatorEngine.calculateLoan(mockInput);
      const expectedTotalInterest = (result.monthlyPayment * mockInput.loanTermMonths) - mockInput.loanAmount;
      
      expect(result.totalInterest).toBeCloseTo(expectedTotalInterest, 2);
    });

    it('should generate amortization schedule with correct length', () => {
      const result = LoanCalculatorEngine.calculateLoan(mockInput);
      
      expect(result.amortizationSchedule).toHaveLength(240);
    });

    it('should have decreasing balance in amortization schedule', () => {
      const result = LoanCalculatorEngine.calculateLoan(mockInput);
      const schedule = result.amortizationSchedule;
      
      // First month balance should be less than loan amount
      expect(schedule[0].balance).toBeLessThan(mockInput.loanAmount);
      
      // Last month balance should be close to zero
      expect(schedule[schedule.length - 1].balance).toBeCloseTo(0, 2);
      
      // Balance should decrease each month
      for (let i = 1; i < schedule.length; i++) {
        expect(schedule[i].balance).toBeLessThanOrEqual(schedule[i - 1].balance);
      }
    });

    it('should calculate effective rate including fees', () => {
      const result = LoanCalculatorEngine.calculateLoan(mockInput);
      
      // Effective rate should be higher than base rate due to fees
      expect(result.effectiveRate).toBeGreaterThan(mockInput.interestRate);
    });
  });

  describe('validateInput', () => {
    it('should return no errors for valid input', () => {
      const errors = LoanCalculatorEngine.validateInput(mockInput);
      expect(errors).toHaveLength(0);
    });

    it('should return error for loan amount too low', () => {
      const invalidInput = { ...mockInput, loanAmount: 100000 };
      const errors = LoanCalculatorEngine.validateInput(invalidInput);
      
      expect(errors).toContain('Loan amount must be at least $150,000');
    });

    it('should return error for loan amount too high', () => {
      const invalidInput = { ...mockInput, loanAmount: 6000000 };
      const errors = LoanCalculatorEngine.validateInput(invalidInput);
      
      expect(errors).toContain('Loan amount cannot exceed $5,000,000');
    });

    it('should return error for invalid interest rate', () => {
      const invalidInput = { ...mockInput, interestRate: 30 };
      const errors = LoanCalculatorEngine.validateInput(invalidInput);
      
      expect(errors).toContain('Interest rate must be between 5% and 25%');
    });

    it('should return error for missing required fields', () => {
      const invalidInput = { 
        loanAmount: 500000,
        interestRate: 8.95
      };
      const errors = LoanCalculatorEngine.validateInput(invalidInput);
      
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(LoanCalculatorEngine.formatCurrency(500000)).toBe('$500,000');
      expect(LoanCalculatorEngine.formatCurrency(1234.56)).toBe('$1,235');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(LoanCalculatorEngine.formatPercentage(8.95)).toBe('8.95%');
      expect(LoanCalculatorEngine.formatPercentage(10)).toBe('10.00%');
    });
  });

  describe('getAAGTRates', () => {
    it('should return rates for all loan purposes', () => {
      const rates = LoanCalculatorEngine.getAAGTRates();
      
      expect(rates).toHaveProperty('business');
      expect(rates).toHaveProperty('investment');
      expect(rates).toHaveProperty('property');
      expect(rates).toHaveProperty('working-capital');
      
      // All rates should be reasonable numbers
      Object.values(rates).forEach(rate => {
        expect(rate).toBeGreaterThan(5);
        expect(rate).toBeLessThan(15);
      });
    });
  });

  describe('getBankComparisonRates', () => {
    it('should return comparison rates including AAGT', () => {
      const rates = LoanCalculatorEngine.getBankComparisonRates();
      
      expect(rates.length).toBeGreaterThan(0);
      
      const aagtRate = rates.find(rate => rate.isAAGT);
      expect(aagtRate).toBeDefined();
      expect(aagtRate?.lender).toBe('AAGT Private Loans');
      
      const bankRates = rates.filter(rate => !rate.isAAGT);
      expect(bankRates.length).toBeGreaterThan(0);
    });
  });

  describe('calculateSavingsVsBanks', () => {
    it('should calculate savings comparison with banks', () => {
      const result = LoanCalculatorEngine.calculateLoan(mockInput);
      const savings = LoanCalculatorEngine.calculateSavingsVsBanks(result, mockInput);
      
      expect(savings).toHaveProperty('avgBankPayment');
      expect(savings).toHaveProperty('monthlySavings');
      expect(savings).toHaveProperty('timeToApprovalDays');
      expect(savings).toHaveProperty('settlementDays');
      
      expect(savings.timeToApprovalDays).toBe(1);
      expect(savings.settlementDays).toBe(4);
      
      expect(typeof savings.avgBankPayment).toBe('number');
      expect(typeof savings.monthlySavings).toBe('number');
    });
  });

  describe('edge cases', () => {
    it('should handle zero interest rate', () => {
      const zeroRateInput = { ...mockInput, interestRate: 0 };
      const result = LoanCalculatorEngine.calculateLoan(zeroRateInput);
      
      // With zero interest, monthly payment should be principal / months
      const expectedPayment = mockInput.loanAmount / mockInput.loanTermMonths;
      expect(result.monthlyPayment).toBeCloseTo(expectedPayment, 2);
      expect(result.totalInterest).toBe(0);
    });

    it('should handle very short loan term', () => {
      const shortTermInput = { ...mockInput, loanTermMonths: 12 };
      const result = LoanCalculatorEngine.calculateLoan(shortTermInput);
      
      expect(result.amortizationSchedule).toHaveLength(12);
      expect(result.monthlyPayment).toBeGreaterThan(40000); // High monthly payment for short term
    });

    it('should handle very long loan term', () => {
      const longTermInput = { ...mockInput, loanTermMonths: 300 };
      const result = LoanCalculatorEngine.calculateLoan(longTermInput);
      
      expect(result.amortizationSchedule).toHaveLength(300);
      expect(result.monthlyPayment).toBeLessThan(mockInput.loanAmount / 100); // Lower monthly payment for long term
    });
  });
});