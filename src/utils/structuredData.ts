import { AppConfig } from './AppConfig';
import { getAssetPath } from './Helpers';

// Helper function to get the base URL from environment or use relative paths
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || '';
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': '#organization',
  name: 'AAGT Private Loans',
  legalName: 'AAGT Private Loans Pty Ltd',
  url: getBaseUrl(),
  logo: getAssetPath('/images/aagt_logo_no_background.png'),
  image: getAssetPath('/images/aagt_logo_no_background.png'),
  description:
    'Direct private lending company offering fast business funding from $150,000 to $5,000,000 with same day approval and 4-day settlement',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  telephone: '+61 461 534 088',
  email: AppConfig.email,
  priceRange: '$150,000-$5,000,000',
  areaServed: 'Australia',
  slogan: AppConfig.mission,
  knowsAbout: [
    'Business Loans',
    'Investment Loans',
    'Private Lending',
    'Second Mortgages',
    'Off-the-Plan Finance',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Private Loan Products',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Business Loans',
          description: 'Fast business funding from $150,000 to $5,000,000',
          url: '/business-loans',
        },
        amount: {
          '@type': 'MonetaryAmount',
          minValue: 150000,
          maxValue: 5000000,
          currency: 'AUD',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Investment Loans',
          description: 'Funding for any worthwhile business or investment purpose',
          url: '/investment-loans',
        },
        amount: {
          '@type': 'MonetaryAmount',
          minValue: 150000,
          maxValue: 5000000,
          currency: 'AUD',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Second Mortgages',
          description: 'Up to 75% LVR for additional capital needs',
          url: '/business-loans',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Off-the-Plan Finance',
          description: 'Special financing solutions for off-the-plan property purchases',
          url: '/investment-loans',
        },
      },
    ],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': '#website',
  url: getBaseUrl(),
  name: 'AAGT Private Loans',
  description:
    'Direct business funding from $150,000 to $5,000,000. Fast approvals, competitive rates, and flexible terms.',
  publisher: {
    '@id': '#organization',
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: '/apply?amount={loan_amount}',
      },
      'query-input': 'required name=loan_amount',
    },
  ],
  inLanguage: 'en-AU',
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const loanProductSchema = (loan: {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: loan.name,
  description: loan.description,
  provider: {
    '@id': '#organization',
  },
  interestRate: 'Competitive rates',
  feesAndCommissionsSpecification: 'Fee-free approval process',
  amount: {
    '@type': 'MonetaryAmount',
    minValue: loan.minAmount,
    maxValue: loan.maxAmount,
    currency: 'AUD',
  },
  url: loan.url,
});

export const faqSchema = (questions: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const financialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': '#financialservice',
  name: 'AAGT Private Loans',
  image: getAssetPath('/images/aagt_logo_no_background.png'),
  '@graph': [
    {
      '@id': '#organization',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  url: getBaseUrl(),
  telephone: '+61 461 534 088',
  serviceType: 'Private Lending',
  areaServed: 'Australia',
};