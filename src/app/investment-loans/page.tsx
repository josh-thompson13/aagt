import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import { CheckCircle2 } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Investment Loans | Property & Business Investment Funding',
    description:
      'Flexible investment loans for property development, off-the-plan purchases, and business investments. Fast approvals from $150,000 to $5,000,000.',
    keywords:
      'investment loans Australia, property investment finance, development finance, off the plan funding, business investment loans',
    alternates: {
      canonical: '/investment-loans',
    },
  };
}

export default function InvestmentLoansPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Investment Loans', url: '/investment-loans' },
  ];

  const loanProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Investment Loans',
    description:
      'Flexible investment loans for property development, off-the-plan purchases, and business investments',
    provider: {
      '@type': 'FinancialService',
      name: 'AAGT Private Loans',
    },
    interestRate: 'Competitive rates for investment funding',
    feesAndCommissionsSpecification: 'Transparent fee structure',
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
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Investment Loans
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Flexible funding for property investments, developments, and strategic opportunities. 
            Whether you're purchasing off-the-plan or expanding your portfolio, we provide fast, 
            direct funding when banks won't.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Loan Amounts</h3>
              <p className="text-2xl font-bold text-primary-700">$150,000 - $5,000,000</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Loan Terms</h3>
              <p className="text-2xl font-bold text-primary-700">1 - 24 Months</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">LVR</h3>
              <p className="text-2xl font-bold text-primary-700">Up to 70%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligible Purposes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Eligible Purposes
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Property development and construction projects</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Off-the-plan property purchases</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Commercial property investments</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Investment portfolio expansion</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Strategic business investments</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Simple Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Simple Requirements
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Clear investment strategy</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Exit plan or refinance strategy</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Security available (property or assets)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Investment experience or professional advice</span>
            </li>
          </ul>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Apply now for fast approval or speak with our lending specialists about your investment plans.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}