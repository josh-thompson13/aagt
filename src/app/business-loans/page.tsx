import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { AppConfig } from '@/utils/AppConfig';
import { CallToAction } from '@/components/common/CallToAction';
import { ArrowRight, CheckCircle2, DollarSign, FileText, Clock, TrendingUp } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Business Loans | Fast Funding $150K-$5M',
    description:
      'Get business loans from $150,000 to $5,000,000 with same day approval and 4-day settlement. Direct funder with minimal documentation required.',
    keywords:
      'business loans Australia, fast business funding, same day approval business loan, quick business finance, $150k business loan',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au/business-loans',
    },
  };
}

export default function BusinessLoansPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aagtprivateloans.com.au' },
    { name: 'Business Loans', url: 'https://aagtprivateloans.com.au/business-loans' },
  ];

  const features = [
    { icon: DollarSign, text: 'Loans from $150,000 to $5,000,000' },
    { icon: Clock, text: 'Same day approval' },
    { icon: FileText, text: 'Minimal documentation' },
    { icon: TrendingUp, text: '4-day settlement' },
  ];

  const loanProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Business Loans',
    description: 'Fast business funding from $150,000 to $5,000,000 with same day approval',
    provider: {
      '@type': 'FinancialService',
      name: 'AAGT Private Loans',
    },
    interestRate: 'Competitive rates',
    feesAndCommissionsSpecification: 'Fee-free approval process',
    amount: {
      '@type': 'MonetaryAmount',
      minValue: 150000,
      maxValue: 5000000,
      currency: 'AUD',
    },
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={loanProductSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Business Loans That Work For You
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              {AppConfig.primaryMessage}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-primary-700 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-white/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white border-2 border-white hover:bg-white hover:text-primary-700 focus:ring-4 focus:ring-white/50 transition-all duration-200"
              >
                Speak to a Specialist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-primary-700 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Direct Funding for Your Business
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                As direct funders, we lend our own money. This means no complex credit committees,
                no lengthy approval processes, and no unnecessary delays. When you need business
                funding, we deliver.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our business loans are designed for entrepreneurs and business owners who need quick
                access to capital. Whether it's for expansion, equipment, inventory, or cash flow
                management, we provide the funding you need to grow.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Any worthwhile business purpose</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Flexible repayment terms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">No hidden fees or charges</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Personalized service throughout</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Loan Amount</h4>
                  <p className="text-2xl font-bold text-primary-700">$150,000 - $5,000,000</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Approval Time</h4>
                  <p className="text-2xl font-bold text-primary-700">Same Day</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Settlement</h4>
                  <p className="text-2xl font-bold text-primary-700">4 Working Days</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Documentation</h4>
                  <p className="text-2xl font-bold text-primary-700">Minimal Required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Simple 4-Step Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-600">Complete our streamlined application in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Assessment</h3>
              <p className="text-gray-600">We review your application immediately</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Same Day Approval</h3>
              <p className="text-gray-600">Get your approval within hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Funds</h3>
              <p className="text-gray-600">Money in your account within 4 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">{AppConfig.mission}</p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of business owners who have chosen AAGT Private Loans for their funding
            needs. No complex committees, no excessive paperwork, just straightforward business
            lending.
          </p>
          <CallToAction />

          {/* Professional Disclaimer */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-white/70 max-w-4xl mx-auto leading-relaxed">
              Applications subject to credit approval and AAGT Private Loans' lending criteria.
              Interest rates and terms may vary based on loan amount, security offered, and
              individual circumstances. This is general information only and does not constitute
              financial advice. AAGT Private Loans is committed to responsible lending practices.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
