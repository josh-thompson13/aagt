export interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  canSkip: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  identification: {
    type: 'drivers_license' | 'passport' | 'medicare';
    number: string;
    expiryDate?: string;
  };
}

export interface BusinessInfo {
  businessName: string;
  abn: string;
  acn?: string;
  businessType: 'sole_trader' | 'partnership' | 'company' | 'trust';
  industryType: string;
  establishedDate: string;
  registeredAddress: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  tradingAddress?: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    sameAsRegistered: boolean;
  };
  employees: number;
  annualTurnover: number;
  description: string;
}

export interface LoanDetails {
  amount: number;
  purpose: 'business_expansion' | 'working_capital' | 'investment_property' | 'debt_consolidation' | 'equipment' | 'other';
  purposeDescription: string;
  term: number;
  repaymentType: 'principal_interest' | 'interest_only';
  securityOffered: boolean;
  securityDetails?: {
    type: 'property' | 'equipment' | 'inventory' | 'accounts_receivable' | 'other';
    description: string;
    estimatedValue: number;
  };
}

export interface FinancialInfo {
  annualIncome: number;
  monthlyExpenses: number;
  assets: {
    cash: number;
    property: number;
    vehicles: number;
    investments: number;
    other: number;
  };
  liabilities: {
    creditCards: number;
    loans: number;
    mortgages: number;
    other: number;
  };
  bankDetails: {
    accountName: string;
    bsb: string;
    accountNumber: string;
    bankName: string;
  };
}

export interface DocumentInfo {
  identityDocuments: UploadedFile[];
  financialStatements: UploadedFile[];
  bankStatements: UploadedFile[];
  taxReturns: UploadedFile[];
  businessRegistration: UploadedFile[];
  additionalDocuments: UploadedFile[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadStatus: 'uploading' | 'completed' | 'error';
  uploadProgress?: number;
  category: string;
}

export interface ApplicationData {
  id?: string;
  personalInfo: Partial<PersonalInfo>;
  businessInfo: Partial<BusinessInfo>;
  loanDetails: Partial<LoanDetails>;
  financialInfo: Partial<FinancialInfo>;
  documents: Partial<DocumentInfo>;
  currentStep: number;
  isCompleted: boolean;
  submittedAt?: string;
  lastSavedAt?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
}

export interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'min' | 'max' | 'custom';
}

export interface StepValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: string[];
}

export interface FormProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  canProceed: boolean;
  canGoBack: boolean;
}

export interface ApplicationSubmissionResult {
  success: boolean;
  applicationId?: string;
  message: string;
  errors?: ValidationError[];
  nextSteps?: string[];
}