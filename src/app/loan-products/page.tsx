import type { Metadata } from 'next';
import { StructuredData } from '@/components/common/StructuredData';
import { LoanProductsCatalog } from '@/components/content/LoanProductsCatalog';
import { loanProducts } from '@/data/loanProducts';
import { getAssetPath } from '@/utils/Helpers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loan Products | Business & Investment Loans | AAGT Private Loans',
  description:
    'Explore our comprehensive range of business and investment loan products. From $150k to $5M with same-day approval. Business expansion, property investment, bridging finance and more.',
  keywords:
    'business loans, investment loans, property finance, bridging loans, working capital, second mortgage, private lender Australia',
  openGraph: {
    title: 'Loan Products | AAGT Private Loans - Business & Investment Finance',
    description:
      "Complete range of business and investment loan products from Australia's leading private lender. Fast approval, competitive rates, flexible terms.",
    type: 'website',
    images: [
      {
        url: getAssetPath('/images/loan-products-og.jpg'),
        width: 1200,
        height: 630,
        alt: 'AAGT Private Loans - Loan Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Products | AAGT Private Loans',
    description:
      'Complete range of business and investment loan products. Same-day approval, competitive rates.',
    images: [getAssetPath('/images/loan-products-og.jpg')],
  },
  alternates: {
    canonical: '/loan-products',
  },
};

export default function LoanProductsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Loan Products',
        item: '/loan-products',
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AAGT Private Loans',
    url: '/',
    logo: getAssetPath('/images/aagt_logo_no_background.png'),
    description:
      'Leading Australian private lender offering business and investment loans from $150,000 to $5,000,000',
    areaServed: 'Australia',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Loan Products',
      itemListElement: loanProducts.map((product) => ({
        '@type': 'Offer',
        name: product.title,
        description: product.shortDescription,
        url: `/loan-products/${product.slug}`,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          minPrice: product.minRate,
          maxPrice: product.maxRate,
          priceCurrency: 'AUD',
        },
        itemOffered: {
          '@type': 'FinancialProduct',
          name: product.title,
          category: product.category,
          feesAndCommissionsSpecification: product.fees.establishment,
        },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What loan amounts do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer loans from $150,000 to $5,000,000 for various business and investment purposes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast can I get approval?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer same-day approval for most loan applications, with settlement typically within 4 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'What security do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept various forms of security including business assets, commercial property, residential property, and personal guarantees.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Loan Products</h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                From business expansion to investment properties, find the perfect funding solution
                for your needs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">$150k - $5M</div>
                  <div className="text-primary-100">Loan Range</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">Same Day</div>
                  <div className="text-primary-100">Approval</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">4 Days</div>
                  <div className="text-primary-100">Settlement</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <LoanProductsCatalog products={loanProducts} />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Speak with our lending specialists about your specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="px-8 py-3 bg-white text-primary-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Calculate Your Loan
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors"
              >
                Speak to a Specialist
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
