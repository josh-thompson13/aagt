interface StructuredDataProps {
  data: Record<string, any>;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
};

// Common structured data generators
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'AAGT Private Loans',
  alternateName: 'AAGT',
  description:
    'Direct private lending company providing business and investment loans from $150,000 to $5,000,000 with fast approvals and competitive rates.',
  url: 'https://aagtprivateloans.com.au',
  logo: 'https://aagtprivateloans.com.au/images/aagt_logo_no_background.png',
  image: 'https://aagtprivateloans.com.au/images/aagt-og-image.jpg',
  telephone: '+61-2-9999-9999',
  email: 'info@aagtprivateloans.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 123 Business Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-33.8688',
    longitude: '151.2093',
  },
  sameAs: ['https://linkedin.com/company/aagt-private-loans', 'https://twitter.com/AAGTLoans'],
  serviceType: 'Private Lending',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Loan Products',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LoanOrCredit',
          name: 'Business Expansion Loans',
          description: 'Business loans from $150,000 to $5,000,000',
          amount: {
            '@type': 'MonetaryAmount',
            currency: 'AUD',
            minValue: 150000,
            maxValue: 5000000,
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LoanOrCredit',
          name: 'Investment Property Loans',
          description: 'Flexible investment property financing solutions',
        },
      },
    ],
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
});

export const generateLoanProductSchema = (product: {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate?: number;
  term?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: product.name,
  description: product.description,
  provider: {
    '@type': 'FinancialService',
    name: 'AAGT Private Loans',
  },
  amount: {
    '@type': 'MonetaryAmount',
    currency: 'AUD',
    minValue: product.minAmount,
    maxValue: product.maxAmount,
  },
  ...(product.interestRate && {
    interestRate: {
      '@type': 'QuantitativeValue',
      value: product.interestRate,
      unitText: 'percent',
    },
  }),
  ...(product.term && {
    loanTerm: product.term,
  }),
  feesAndCommissionsSpecification: 'Transparent fee structure available upon application',
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  subtype: 'FinancialService',
  name: 'AAGT Private Loans',
  description:
    'Leading private lending company in Australia specializing in business and investment loans.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 123 Business Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  telephone: '+61-2-9999-9999',
  email: 'info@aagtprivateloans.com.au',
  url: 'https://aagtprivateloans.com.au',
  priceRange: '$150,000 - $5,000,000',
  currenciesAccepted: 'AUD',
  paymentAccepted: 'Bank Transfer, Electronic Transfer',
  openingHours: 'Mo-Fr 09:00-17:00',
});
