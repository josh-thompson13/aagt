import type { ApplicationData, ValidationError } from '@/types/application';
import { z } from 'zod';

// Australian-specific validation patterns
const PATTERNS = {
  phone: /^(\+?61|0)[2-9]\d{8}$/,
  abn: /^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/,
  acn: /^\d{3}\s?\d{3}\s?\d{3}$/,
  bsb: /^\d{3}-?\d{3}$/,
  postcode: /^\d{4}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Personal Information Schema
const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  phone: z.string().regex(PATTERNS.phone, 'Invalid Australian phone number'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 100;
    }, 'Must be between 18 and 100 years old'),
  address: z.object({
    street: z.string().min(1, 'Street address is required').max(100, 'Address too long'),
    city: z.string().min(1, 'City is required').max(50, 'City name too long'),
    state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'], {
      errorMap: () => ({ message: 'Please select a valid state' }),
    }),
    postcode: z.string().regex(PATTERNS.postcode, 'Invalid postcode'),
    country: z.string().default('Australia'),
  }),
  identification: z.object({
    type: z.enum(['drivers_license', 'passport', 'medicare'], {
      errorMap: () => ({ message: 'Please select identification type' }),
    }),
    number: z.string().min(1, 'Identification number is required'),
    expiryDate: z
      .string()
      .optional()
      .refine((date) => !date || new Date(date) > new Date(), 'Identification must not be expired'),
  }),
});

// Business Information Schema
const businessInfoSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100, 'Business name too long'),
  abn: z
    .string()
    .regex(PATTERNS.abn, 'Invalid ABN format (11 digits)')
    .transform((val) => val.replace(/\s/g, '')),
  acn: z.string().regex(PATTERNS.acn, 'Invalid ACN format (9 digits)').optional().or(z.literal('')),
  businessType: z.enum(['sole_trader', 'partnership', 'company', 'trust'], {
    errorMap: () => ({ message: 'Please select business type' }),
  }),
  industryType: z.string().min(1, 'Industry type is required'),
  establishedDate: z
    .string()
    .min(1, 'Business establishment date is required')
    .refine((date) => {
      const establishedDate = new Date(date);
      const today = new Date();
      return establishedDate <= today;
    }, 'Establishment date cannot be in the future'),
  registeredAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']),
    postcode: z.string().regex(PATTERNS.postcode, 'Invalid postcode'),
    country: z.string().default('Australia'),
  }),
  tradingAddress: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']).optional(),
      postcode: z
        .string()
        .regex(PATTERNS.postcode, 'Invalid postcode')
        .optional()
        .or(z.literal('')),
      country: z.string().default('Australia'),
      sameAsRegistered: z.boolean().default(true),
    })
    .optional(),
  employees: z
    .number()
    .min(0, 'Number of employees cannot be negative')
    .max(10000, 'Too many employees'),
  annualTurnover: z.number().min(0, 'Annual turnover cannot be negative'),
  description: z
    .string()
    .min(10, 'Please provide a detailed business description')
    .max(500, 'Description too long'),
});

// Loan Details Schema
const loanDetailsSchema = z.object({
  amount: z
    .number()
    .min(150000, 'Minimum loan amount is $150,000')
    .max(5000000, 'Maximum loan amount is $10,000,000'),
  purpose: z.enum(
    [
      'business_expansion',
      'working_capital',
      'investment_property',
      'debt_consolidation',
      'equipment',
      'other',
    ],
    {
      errorMap: () => ({ message: 'Please select loan purpose' }),
    }
  ),
  purposeDescription: z
    .string()
    .min(10, 'Please provide detailed purpose description')
    .max(300, 'Description too long'),
  term: z.number().min(1, 'Minimum term is 1 month').max(300, 'Maximum term is 300 months'),
  repaymentType: z.enum(['principal_interest', 'interest_only'], {
    errorMap: () => ({ message: 'Please select repayment type' }),
  }),
  securityOffered: z.boolean(),
  securityDetails: z
    .object({
      type: z.enum(['property', 'equipment', 'inventory', 'accounts_receivable', 'other']),
      description: z.string().min(10, 'Please describe the security offered'),
      estimatedValue: z.number().min(1, 'Security value must be greater than 0'),
    })
    .optional(),
});

// Financial Information Schema
const financialInfoSchema = z.object({
  annualIncome: z.number().min(1, 'Annual income is required').max(100000000, 'Income too high'),
  monthlyExpenses: z
    .number()
    .min(0, 'Monthly expenses cannot be negative')
    .max(10000000, 'Expenses too high'),
  assets: z.object({
    cash: z.number().min(0, 'Cash assets cannot be negative'),
    property: z.number().min(0, 'Property assets cannot be negative'),
    vehicles: z.number().min(0, 'Vehicle assets cannot be negative'),
    investments: z.number().min(0, 'Investment assets cannot be negative'),
    other: z.number().min(0, 'Other assets cannot be negative'),
  }),
  liabilities: z.object({
    creditCards: z.number().min(0, 'Credit card debt cannot be negative'),
    loans: z.number().min(0, 'Loan debt cannot be negative'),
    mortgages: z.number().min(0, 'Mortgage debt cannot be negative'),
    other: z.number().min(0, 'Other debt cannot be negative'),
  }),
  bankDetails: z.object({
    accountName: z.string().min(1, 'Account name is required'),
    bsb: z.string().regex(PATTERNS.bsb, 'Invalid BSB format (XXX-XXX)'),
    accountNumber: z.string().min(6, 'Account number too short').max(10, 'Account number too long'),
    bankName: z.string().min(1, 'Bank name is required'),
  }),
});

// Main application schema
export const applicationSchema = z.object({
  personalInfo: personalInfoSchema.partial(),
  businessInfo: businessInfoSchema.partial(),
  loanDetails: loanDetailsSchema.partial(),
  financialInfo: financialInfoSchema.partial(),
  documents: z.object({}).optional(),
});

// Step-specific validation
export const stepSchemas = {
  personal: personalInfoSchema,
  business: businessInfoSchema,
  loan: loanDetailsSchema,
  financial: financialInfoSchema,
} as const;

// Validation helper functions
export const validateField = (
  fieldPath: string,
  value: any,
  schema: z.ZodSchema
): { isValid: boolean; error?: string } => {
  try {
    const fieldSchema = getNestedSchema(schema, fieldPath);
    fieldSchema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues[0]?.message || 'Invalid value',
      };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validateStep = (
  stepId: keyof typeof stepSchemas,
  data: any
): { isValid: boolean; errors: ValidationError[] } => {
  try {
    const schema = stepSchemas[stepId];
    schema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        type: getErrorType(issue.code),
      }));
      return { isValid: false, errors };
    }
    return {
      isValid: false,
      errors: [{ field: 'general', message: 'Validation error', type: 'custom' }],
    };
  }
};

export const validateApplication = (
  data: ApplicationData
): { isValid: boolean; errors: ValidationError[] } => {
  const allErrors: ValidationError[] = [];

  // Validate each step
  Object.keys(stepSchemas).forEach((stepId) => {
    const stepData = data[stepId as keyof ApplicationData];
    if (stepData) {
      const result = validateStep(stepId as keyof typeof stepSchemas, stepData);
      allErrors.push(...result.errors);
    }
  });

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};

// Sanitization functions
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .substring(0, 1000); // Limit length
};

export const sanitizeNumericInput = (input: string | number): number => {
  const num = typeof input === 'string' ? parseFloat(input.replace(/[^0-9.-]/g, '')) : input;
  return Number.isNaN(num) ? 0 : Math.max(0, num);
};

// Helper functions
const getNestedSchema = (schema: z.ZodSchema, path: string): z.ZodSchema => {
  const parts = path.split('.');
  let current = schema;

  for (const part of parts) {
    if (current instanceof z.ZodObject) {
      current = current.shape[part];
    }
  }

  return current;
};

const getErrorType = (zodCode: z.ZodIssueCode): ValidationError['type'] => {
  switch (zodCode) {
    case z.ZodIssueCode.too_small:
      return 'min';
    case z.ZodIssueCode.too_big:
      return 'max';
    case z.ZodIssueCode.invalid_string:
    case z.ZodIssueCode.invalid_type:
      return 'format';
    default:
      return 'custom';
  }
};

// Real-time validation debouncer
export const createDebouncedValidator = (
  validateFn: (value: any) => { isValid: boolean; error?: string },
  delay = 300
) => {
  let timeoutId: NodeJS.Timeout;

  return (value: any, callback: (result: { isValid: boolean; error?: string }) => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = validateFn(value);
      callback(result);
    }, delay);
  };
};
