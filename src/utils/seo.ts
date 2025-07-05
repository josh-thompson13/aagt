import type { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: Record<string, any>;
}

const defaultMetadata = {
  title: 'AAGT Private Loans',
  description:
    'Direct business funding from $150,000 to $5,000,000. Fast approvals, competitive rates, and flexible terms. Alternative lending solutions for businesses declined by traditional banks.',
  siteName: 'AAGT Private Loans',
  baseUrl: '', // Base URL will be set from environment
  ogImage: '/images/aagt-og-image.jpg',
};

export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = defaultMetadata.ogImage,
    ogType = 'website',
    articleData,
  } = seoData;

  const fullTitle = title.includes(defaultMetadata.title)
    ? title
    : `${title} | ${defaultMetadata.title}`;

  const url = canonical || '';
  const imageUrl = ogImage.startsWith('http') ? ogImage : ogImage;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: ogType,
      locale: 'en_AU',
      ...(articleData &&
        ogType === 'article' && {
          publishedTime: articleData.publishedTime,
          modifiedTime: articleData.modifiedTime,
          authors: articleData.author ? [articleData.author] : undefined,
          section: articleData.section,
          tags: articleData.tags,
        }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@AAGTLoans',
      site: '@AAGTLoans',
    },

    // Additional meta tags
    other: {
      'business-type': 'Financial Services',
      'geo-region': 'AU',
      'geo-country': 'Australia',
      'contact-type': 'business',
      audience: 'business owners, investors, brokers',
    },

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      other: {
        'facebook-domain-verification': process.env.NEXT_PUBLIC_FB_VERIFICATION || '',
      },
    },
  };

  return metadata;
}

export const defaultSEOData: SEOData = {
  title: 'Business & Investment Loans $150K-$5M | AAGT Private Loans',
  description: defaultMetadata.description,
  keywords: [
    'private business loans',
    'alternative business funding',
    'fast business loan approval',
    'commercial private lender',
    'business loans Australia',
    'investment property finance',
    'bridge loans',
    'second mortgage',
    'non-bank business loans',
    'private lending solutions',
  ],
};

// Page-specific SEO data
export const pageSEOData = {
  home: {
    title: 'Business & Investment Loans $150K-$5M | AAGT Private Loans',
    description:
      'Direct private lending for businesses and investors. Same-day approval, 4-day settlement. Competitive rates from 8.5%. Alternative funding when banks say no.',
    keywords: [
      'private business loans Australia',
      'fast business loan approval',
      'alternative business funding',
      'commercial private lender',
      'same day loan approval',
    ],
  },

  businessLoans: {
    title: 'Business Loans $150K-$5M | Fast Approval | AAGT Private Loans',
    description:
      'Business expansion loans from $150,000 to $5,000,000. Direct private lender with streamlined approval process. Apply today for competitive rates.',
    keywords: [
      'business expansion loans',
      'working capital loans',
      'commercial loans Australia',
      'business finance solutions',
      'private business funding',
    ],
  },

  investmentLoans: {
    title: 'Investment Property Loans | Flexible Terms | AAGT Private Loans',
    description:
      'Investment property finance with flexible terms and competitive rates. Specialized solutions for property investors and developers.',
    keywords: [
      'investment property loans',
      'property development finance',
      'investment property funding',
      'property investor loans',
      'commercial property loans',
    ],
  },

  rates: {
    title: 'Interest Rates & Terms | Competitive Pricing | AAGT Private Loans',
    description:
      'Transparent interest rates from 8.5% with flexible terms 1-24 months. Compare our competitive rates with traditional bank lending.',
    keywords: [
      'private loan interest rates',
      'business loan rates Australia',
      'competitive loan rates',
      'flexible loan terms',
      'loan rate comparison',
    ],
  },

  about: {
    title: 'About AAGT Private Loans | Direct Private Lender Australia',
    description:
      'Leading direct private lender using proprietary funds. Streamlined approval process without committee delays. Learn about our lending philosophy.',
    keywords: [
      'private lending company',
      'direct private lender',
      'Australian private loans',
      'alternative lending solutions',
      'business loan specialists',
    ],
  },

  contact: {
    title: 'Contact AAGT Private Loans | Get Your Quote Today',
    description:
      'Contact our lending specialists for fast business loan assessment. Call, email, or submit online inquiry for same-day response.',
    keywords: [
      'business loan inquiry',
      'private loan consultation',
      'loan application help',
      'lending specialists',
      'business funding contact',
    ],
  },

  apply: {
    title: 'Apply for Business Loan | Quick Application | AAGT Private Loans',
    description:
      'Quick and secure business loan application. Get approved in hours with minimal documentation. Start your funding journey today.',
    keywords: [
      'business loan application',
      'apply for business loan',
      'quick loan application',
      'secure loan application',
      'business funding application',
    ],
  },
};
