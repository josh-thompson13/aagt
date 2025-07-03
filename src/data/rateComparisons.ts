import type { RateComparison } from '@/types/content';

export const rateComparisons: RateComparison[] = [
  // Business Loans
  {
    id: 'aagt-business',
    lender: 'AAGT Private Loans',
    productName: 'Business Expansion Loan',
    rate: 8.95,
    comparisonRate: 9.12,
    fees: {
      establishment: 1500,
      monthly: 0,
      annual: 0
    },
    features: [
      'Same-day approval',
      '4-day settlement',
      'No monthly fees',
      'Direct private lender',
      'Flexible security options'
    ],
    minLoanAmount: 150000,
    maxLoanAmount: 5000000,
    maxLvr: 80,
    isAAGT: true,
    lastUpdated: '2024-01-15',
    category: 'business'
  },
  {
    id: 'cba-business',
    lender: 'Commonwealth Bank',
    productName: 'Business Loan',
    rate: 7.25,
    comparisonRate: 7.58,
    fees: {
      establishment: 3500,
      monthly: 25,
      annual: 300
    },
    features: [
      'Branch support',
      'Online banking',
      'Government guarantee eligible',
      '10-14 day approval'
    ],
    minLoanAmount: 50000,
    maxLoanAmount: 3000000,
    maxLvr: 70,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'business'
  },
  {
    id: 'anz-business',
    lender: 'ANZ',
    productName: 'Business Growth Loan',
    rate: 7.45,
    comparisonRate: 7.74,
    fees: {
      establishment: 3200,
      monthly: 20,
      annual: 240
    },
    features: [
      'Relationship banking',
      'Online applications',
      'Equipment finance options',
      '7-10 day approval'
    ],
    minLoanAmount: 75000,
    maxLoanAmount: 2500000,
    maxLvr: 75,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'business'
  },
  {
    id: 'nab-business',
    lender: 'NAB',
    productName: 'Business Loan',
    rate: 7.35,
    comparisonRate: 7.71,
    fees: {
      establishment: 3800,
      monthly: 30,
      annual: 360
    },
    features: [
      'Business specialists',
      'Digital banking',
      'Cashflow support',
      '10-14 day approval'
    ],
    minLoanAmount: 100000,
    maxLoanAmount: 4000000,
    maxLvr: 70,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'business'
  },
  {
    id: 'westpac-business',
    lender: 'Westpac',
    productName: 'Business Loan',
    rate: 7.55,
    comparisonRate: 7.89,
    fees: {
      establishment: 3600,
      monthly: 25,
      annual: 300
    },
    features: [
      'Business advisors',
      'Equipment finance',
      'Working capital solutions',
      '7-14 day approval'
    ],
    minLoanAmount: 50000,
    maxLoanAmount: 3500000,
    maxLvr: 75,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'business'
  },

  // Investment Loans
  {
    id: 'aagt-investment',
    lender: 'AAGT Private Loans',
    productName: 'Investment Property Loan',
    rate: 9.25,
    comparisonRate: 9.42,
    fees: {
      establishment: 1600,
      monthly: 0,
      annual: 0
    },
    features: [
      '48-hour approval',
      '5-day settlement',
      'Up to 70% LVR',
      'Interest-only options',
      'Portfolio lending'
    ],
    minLoanAmount: 200000,
    maxLoanAmount: 5000000,
    maxLvr: 70,
    isAAGT: true,
    lastUpdated: '2024-01-15',
    category: 'investment'
  },
  {
    id: 'cba-investment',
    lender: 'Commonwealth Bank',
    productName: 'Investment Home Loan',
    rate: 6.89,
    comparisonRate: 7.12,
    fees: {
      establishment: 600,
      monthly: 10,
      annual: 395
    },
    features: [
      'Offset account',
      'Redraw facility',
      'NetBank access',
      '14-21 day approval'
    ],
    minLoanAmount: 50000,
    maxLoanAmount: 3000000,
    maxLvr: 80,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'investment'
  },
  {
    id: 'anz-investment',
    lender: 'ANZ',
    productName: 'Investment Property Loan',
    rate: 6.95,
    comparisonRate: 7.18,
    fees: {
      establishment: 995,
      monthly: 15,
      annual: 395
    },
    features: [
      'Portfolio review',
      'Offset account',
      'Internet banking',
      '10-14 day approval'
    ],
    minLoanAmount: 100000,
    maxLoanAmount: 2500000,
    maxLvr: 80,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'investment'
  },
  {
    id: 'nab-investment',
    lender: 'NAB',
    productName: 'Investment Home Loan',
    rate: 6.99,
    comparisonRate: 7.22,
    fees: {
      establishment: 1200,
      monthly: 12,
      annual: 395
    },
    features: [
      'Property investment support',
      'Offset account',
      'NAB Connect',
      '14-21 day approval'
    ],
    minLoanAmount: 80000,
    maxLoanAmount: 3000000,
    maxLvr: 80,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'investment'
  },
  {
    id: 'westpac-investment',
    lender: 'Westpac',
    productName: 'Investment Home Loan',
    rate: 7.05,
    comparisonRate: 7.28,
    fees: {
      establishment: 750,
      monthly: 10,
      annual: 395
    },
    features: [
      'Property insights',
      'Offset account',
      'Online banking',
      '10-14 day approval'
    ],
    minLoanAmount: 50000,
    maxLoanAmount: 2800000,
    maxLvr: 80,
    isAAGT: false,
    lastUpdated: '2024-01-15',
    category: 'investment'
  }
];

export const rateCategories = [
  {
    id: 'business',
    name: 'Business Loans',
    description: 'Compare business loan rates from major lenders'
  },
  {
    id: 'investment',
    name: 'Investment Loans',
    description: 'Investment property loan rate comparisons'
  },
  {
    id: 'personal',
    name: 'Personal Loans',
    description: 'Personal lending rate comparisons'
  }
];

export const comparisonMetrics = [
  {
    key: 'rate',
    label: 'Interest Rate',
    description: 'Base interest rate charged on the loan'
  },
  {
    key: 'comparisonRate',
    label: 'Comparison Rate',
    description: 'Rate including fees and charges for true cost comparison'
  },
  {
    key: 'establishment',
    label: 'Establishment Fee',
    description: 'One-time fee charged when the loan is established'
  },
  {
    key: 'approval',
    label: 'Approval Time',
    description: 'Typical time to receive loan approval'
  },
  {
    key: 'settlement',
    label: 'Settlement Time',
    description: 'Time from approval to fund settlement'
  }
];