import type { Metadata } from 'next';
import { StructuredData } from '@/components/common/StructuredData';
import { FAQSystem } from '@/components/content/FAQSystem';
import { faqs, featuredFAQs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Private Lending FAQ | AAGT Private Loans',
  description:
    "Find answers to common questions about private lending, loan applications, rates, fees, and more. Get expert answers from Australia's leading private lender.",
  keywords:
    'private lending FAQ, business loan questions, loan application help, private lender questions, lending advice Australia',
  openGraph: {
    title: 'FAQ - Your Private Lending Questions Answered | AAGT Private Loans',
    description:
      "Get instant answers to your private lending questions. Comprehensive FAQ covering rates, applications, eligibility, and more from Australia's trusted private lender.",
    type: 'website',
    images: [
      {
        url: '/images/faq-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AAGT Private Loans - FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Lending FAQ | AAGT Private Loans',
    description:
      "Get answers to your private lending questions. Expert advice from Australia's leading private lender.",
    images: ['/images/faq-og.jpg'],
  },
  alternates: {
    canonical: 'https://aagtprivateloans.com.au/faq',
  },
};

export default function FAQPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aagtprivateloans.com.au',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: 'https://aagtprivateloans.com.au/faq',
      },
    ],
  };

  const faqPageSchema = {
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
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AAGT Private Loans',
    url: 'https://aagtprivateloans.com.au',
    logo: 'https://aagtprivateloans.com.au/images/aagt_logo_no_background.png',
    description:
      'Leading Australian private lender providing expert answers and support for business and investment lending',
    areaServed: 'Australia',
    knowsAbout: [
      'Business Loans',
      'Investment Property Loans',
      'Private Lending',
      'Commercial Finance',
      'Asset Finance',
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqPageSchema} />
      <StructuredData data={organizationSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Get instant answers to your private lending questions from Australia's leading
                specialists
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">{faqs.length}+</div>
                  <div className="text-primary-100">Questions Answered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-primary-100">Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">Expert</div>
                  <div className="text-primary-100">Advice</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured FAQs Preview */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Popular Questions</h2>
              <p className="text-gray-600">Quick answers to our most frequently asked questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFAQs.slice(0, 6).map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {faq.answer.substring(0, 120)}...
                  </p>
                  <div className="mt-3 text-primary-600 text-sm font-medium">
                    View full answer →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main FAQ System */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <FAQSystem faqs={faqs} />
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Our lending specialists are here to help with personalized answers to your specific
              questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ask a Question
              </a>
              <a
                href="tel:1300-AAGT-LOANS"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors"
              >
                Call 1300 AAGT LOANS
              </a>
            </div>

            <div className="mt-8 text-sm text-primary-200">
              <p>Speak to a lending specialist • Monday to Friday 8am-6pm • Same-day response</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
