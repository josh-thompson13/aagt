import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import { CheckCircle2 } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Business Loans | Fast Funding $150K-$5M',
    description:
      'Get business loans from $150,000 to $5,000,000 with same day approval and 4-day settlement. Direct funder with minimal documentation required.',
    keywords:
      'business loans Australia, fast business funding, same day approval business loan, quick business finance, $150k business loan',
    alternates: {
      canonical: '/business-loans',
    },
  };
}

export default function BusinessLoansPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Business Loans', url: '/business-loans' },
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
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Business Loans
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Fast business funding for companies that need capital quickly. We understand banks can be slow
            and bureaucratic - we're different. Direct funding with same day approval and 4-day settlement.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Loan Amounts</h3>
              <p className="text-2xl font-bold text-primary-100">$150,000 - $5,000,000</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Loan Terms</h3>
              <p className="text-2xl font-bold text-primary-100">1 - 24 Months</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">LVR</h3>
              <p className="text-2xl font-bold text-primary-100">Up to 70%</p>
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
              <span className="text-lg text-slate-700">Business expansion and growth initiatives</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Equipment and machinery purchases</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Working capital and cash flow management</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Business acquisitions and buyouts</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-700">Inventory and stock purchases</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Simple Requirements Section */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Simple Requirements
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Established Australian business</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Clear repayment strategy</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Security available (property or business assets)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Basic financial documentation</span>
            </li>
          </ul>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Apply now for fast approval or speak with our lending specialists about your business needs.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}