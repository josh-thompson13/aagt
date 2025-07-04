import { StructuredData } from '@/components/common/StructuredData';
import { LuxuryServices } from '@/components/prestige/LuxuryServices';
import { PrestigeHero } from '@/components/prestige/PrestigeHero';
import { WhyAAGT } from '@/components/ui/WhyAAGT';
import { breadcrumbSchema } from '@/utils/structuredData';

export async function generateMetadata() {
  return {
    title: 'AAGT Private Loans | Fast Business Funding Australia',
    description:
      'AAGT Private Loans provides direct business funding from $150,000 to $5,000,000. Fast approvals, competitive rates, and flexible terms. Explore alternative lending solutions today.',
    keywords:
      'private loans Australia, business loans fast approval, private lending Sydney, same day loan approval, off the plan finance, bank rejected loan alternative, quick business funding, second mortgage lender, 4 day loan settlement, private funder direct',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au',
    },
    openGraph: {
      title: 'AAGT Private Loans | Alternative Business Funding Solutions',
      description:
        'Direct business funding from $150,000 to $5,000,000. Same day approval, 4-day settlement. Professional lending solutions for Australian businesses.',
      url: 'https://aagtprivateloans.com.au',
      siteName: 'AAGT Private Loans',
      images: [
        {
          url: 'https://aagtprivateloans.com.au/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AAGT Private Loans - Fast & Easy Business Funding',
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AAGT Private Loans | Alternative Business Funding Solutions',
      description:
        'Direct business funding from $150,000 to $5,000,000. Same day approval, 4-day settlement. Professional lending solutions.',
      images: ['https://aagtprivateloans.com.au/og-image.jpg'],
    },
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
  };
}

export default function Index() {
  const breadcrumbs = [{ name: 'Home', url: 'https://aagtprivateloans.com.au' }];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AAGT Private Loans',
    description:
      'Direct private lending company offering fast business funding from $150k to $5M with same day approval and 4-day settlement',
    url: 'https://aagtprivateloans.com.au',
    logo: 'https://aagtprivateloans.com.au/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    areaServed: 'Australia',
    priceRange: '$150,000-$5,000,000',
    slogan: 'DREAM LESS, DO MORE',
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
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Investment Loans',
            description: 'Funding for any worthwhile business or investment purpose',
          },
        },
      ],
    },
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={organizationSchema} />
      <PrestigeHero />
      <LuxuryServices />
      <WhyAAGT />
    
    </>
  );
}
