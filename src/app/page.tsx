import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { PrestigeHero } from '@/components/prestige/PrestigeHero';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { LuxuryServices } from '@/components/prestige/LuxuryServices';
import { ContactSection } from '@/components/prestige/ContactSection';

export async function generateMetadata() {
  return {
    title: 'Realty Direct | Real Estate Agency Queensland',
    description: 'Professional real estate services across Queensland. Helping with buying, selling, and renting properties in Brisbane, Gold Coast, and surrounding areas.',
    keywords: 'real estate queensland, property brisbane, homes gold coast, real estate agency, properties queensland',
    alternates: {
      canonical: 'https://realtydirect.com.au',
    },
    openGraph: {
      title: 'Realty Direct | Real Estate Agency Queensland',
      description: 'Professional real estate services across Queensland. Helping with buying, selling, and renting properties in Brisbane, Gold Coast, and surrounding areas.',
      url: 'https://realtydirect.com.au',
      siteName: 'Realty Direct',
      images: [
        {
          url: 'https://realtydirect.com.au/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Realty Direct - Queensland Real Estate Platform',
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Realty Direct | Real Estate Agency Queensland',
      description: 'Professional real estate services across Queensland. Helping with buying, selling, and renting properties in Brisbane, Gold Coast, and surrounding areas.',
      images: ['https://realtydirect.com.au/og-image.jpg'],
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

  const breadcrumbs = [
    { name: 'Home', url: 'https://realtydirect.com.au' },
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Realty Direct',
    'description': 'Professional real estate services across Queensland',
    'url': 'https://realtydirect.com.au',
    'logo': 'https://realtydirect.com.au/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Brisbane',
      'addressRegion': 'Queensland',
      'addressCountry': 'AU'
    },
    'areaServed': ['Brisbane', 'Gold Coast', 'Sunshine Coast'],
    'priceRange': '$$$$$'
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={organizationSchema} />
      <PrestigeHero />
      <MarketingSection />
      <LuxuryServices />
      <section className="py-24 bg-primary-900">
        <ContactSection />
      </section>
    </>
  );
};