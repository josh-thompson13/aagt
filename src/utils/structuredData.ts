import { AppConfig } from './AppConfig';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': 'https://aagtprivateloans.com.au#organization',
  name: 'AAGT Private Loans',
  legalName: 'AAGT Private Loans Pty Ltd',
  url: 'https://aagtprivateloans.com.au',
  logo: 'https://aagtprivateloans.com.au/images/aagt_logo_no_background.png',
  image: 'https://aagtprivateloans.com.au/images/aagt_logo_no_background.png',
  description: 'Direct private lending company offering fast business funding from $150,000 to $5,000,000 with same day approval and 4-day settlement',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  telephone: '1300-AAGT-LOANS',
  email: AppConfig.email,
  priceRange: '$150,000-$5,000,000',
  areaServed: 'Australia',
  slogan: AppConfig.mission,
  knowsAbout: ['Business Loans', 'Investment Loans', 'Private Lending', 'Second Mortgages', 'Off-the-Plan Finance'],
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
          url: 'https://aagtprivateloans.com.au/business-loans',
        },
        amount: {
          '@type': 'MonetaryAmount',
          minValue: 150000,
          maxValue: 5000000,
          currency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Investment Loans',
          description: 'Funding for any worthwhile business or investment purpose',
          url: 'https://aagtprivateloans.com.au/investment-loans',
        },
        amount: {
          '@type': 'MonetaryAmount',
          minValue: 150000,
          maxValue: 5000000,
          currency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Second Mortgages',
          description: 'Up to 70% LVR for additional capital needs',
          url: 'https://aagtprivateloans.com.au/business-loans',
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'FinancialProduct',
          name: 'Off-the-Plan Finance',
          description: 'Special financing solutions for off-the-plan property purchases',
          url: 'https://aagtprivateloans.com.au/investment-loans',
        }
      },
    ],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://aagtprivateloans.com.au#website',
  url: 'https://aagtprivateloans.com.au',
  name: 'AAGT Private Loans',
  description: 'Direct business funding from $150,000 to $5,000,000. Fast approvals, competitive rates, and flexible terms.',
  publisher: {
    '@id': 'https://aagtprivateloans.com.au#organization',
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aagtprivateloans.com.au/apply?amount={loan_amount}',
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
    '@id': 'https://aagtprivateloans.com.au#organization',
  },
  interestRate: 'Competitive rates',
  feesAndCommissionsSpecification: 'Fee-free approval process',
  amount: {
    '@type': 'MonetaryAmount',
    minValue: loan.minAmount,
    maxValue: loan.maxAmount,
    currency: 'AUD'
  },
  url: loan.url,
});

export const faqSchema = (questions: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map(item => ({
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
  '@id': 'https://aagtprivateloans.com.au#financialservice',
  name: 'AAGT Private Loans',
  image: 'https://aagtprivateloans.com.au/images/aagt_logo_no_background.png',
  '@graph': [
    {
      '@id': 'https://aagtprivateloans.com.au#organization',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  url: 'https://aagtprivateloans.com.au',
  telephone: '1300-AAGT-LOANS',
  serviceType: 'Private Lending',
  areaServed: 'Australia',
};