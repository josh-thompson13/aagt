import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { AppConfig } from '@/utils/AppConfig';
import { CallToAction } from '@/components/common/CallToAction';
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  TrendingDown,
  Clock,
  FileText,
  Shield,
  DollarSign,
} from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Rates & Terms | Competitive Private Loan Rates',
    description:
      'Transparent private loan rates and terms. Compare our competitive interest rates with major banks. Flexible terms from 1-24 months.',
    keywords:
      'private loan rates Australia, business loan interest rates, competitive loan terms, private lending rates, loan comparison',
    alternates: {
      canonical: '/rates',
    },
  };
}

export default function RatesTermsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Rates & Terms', url: '/rates' },
  ];

  const features = [
    { icon: TrendingDown, text: 'Competitive Interest Rates' },
    { icon: Calculator, text: 'Transparent Fee Structure' },
    { icon: Clock, text: 'Flexible Terms 1-24 Months' },
    { icon: Shield, text: 'No Hidden Charges' },
  ];

  const loanTypes = [
    {
      type: 'Business Loans',
      purpose: 'Working capital, expansion, equipment',
      rateRange: '8.5 - 12% per annum',
      lvrMax: 'Up to 70% LVR',
      termOptions: '1-24 months',
      features: [
        'Same day approval',
        'Minimal documentation',
        'Any business purpose',
        'Fast settlement',
      ],
    },
    {
      type: 'Investment Loans',
      purpose: 'Property development, off-the-plan',
      rateRange: '8.5 - 12% per annum',
      lvrMax: 'Up to 70% LVR',
      termOptions: '1-24 months',
      features: ['Development finance', 'Progress payments', 'Exit strategies', 'Flexible terms'],
    },
    {
      type: 'Bridge Finance',
      purpose: 'Short-term funding solutions',
      rateRange: '8.5 - 12% per annum',
      lvrMax: 'Up to 65% LVR',
      termOptions: '1-12 months',
      features: [
        'Quick settlements',
        'Temporary funding',
        'Property bridging',
        'Cash flow solutions',
      ],
    },
    {
      type: 'Second Mortgages',
      purpose: 'Additional capital needs',
      rateRange: '14.9 - 17.9% per annum',
      lvrMax: 'Up to 70% LVR',
      termOptions: '1-24 months',
      features: ['Equity release', 'Debt consolidation', 'Business funding', 'Investment capital'],
    },
  ];

  const feeStructure = [
    {
      fee: 'Application Fee',
      cost: '$0',
      description: 'No upfront application fees',
    },
    {
      fee: 'Valuation',
      cost: 'At cost',
      description: 'Professional valuation arranged',
    },
    {
      fee: 'Legal Costs',
      cost: 'At cost',
      description: 'Independent legal documentation',
    },
    {
      fee: 'Exit Fee',
      cost: '$0',
      description: 'No penalty for early repayment',
    },
  ];

  const bankComparison = [
    {
      bank: 'Big 4 Banks',
      rate: '8.5% - 12.5% p.a.',
      approval: '4-8 weeks',
      documentation: 'Extensive',
    },
    {
      bank: 'Regional Banks',
      rate: '9.0% - 13.0% p.a.',
      approval: '3-6 weeks',
      documentation: 'Comprehensive',
    },
    {
      bank: 'AAGT Private',
      rate: '8.5 - 17.9% p.a.',
      approval: 'Same day',
      documentation: 'Minimal',
    },
  ];

  const loanProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Private Loan Rates and Terms',
    description:
      'Competitive private loan rates with transparent terms and flexible repayment options',
    provider: {
      '@type': 'FinancialService',
      name: 'AAGT Private Loans',
    },
    interestRate: '8.5 - 17.9% per annum',
    feesAndCommissionsSpecification: 'No application fees, transparent cost structure',
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
              Transparent Rates & Terms
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Competitive private loan rates with no hidden fees and flexible terms designed for
              your business needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-primary-700 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-white/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get Your Rate
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

      {/* Loan Types and Rates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Current Rates by Loan Type
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our rates are competitive and transparent. All rates shown are indicative and subject
              to individual assessment and loan approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loanTypes.map((loan, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{loan.type}</h3>
                  <p className="text-gray-600 mb-4">{loan.purpose}</p>
                  <div className="text-3xl font-bold text-primary-700 mb-2">{loan.rateRange}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Max LVR</span>
                    <div className="text-lg font-semibold text-gray-900">{loan.lvrMax}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Term</span>
                    <div className="text-lg font-semibold text-gray-900">{loan.termOptions}</div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {loan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transparent Fee Structure
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              No hidden fees or surprise charges. Here's exactly what you can expect to pay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feeStructure.map((fee, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{fee.fee}</h3>
                <div className="text-2xl font-bold text-primary-700 mb-2">{fee.cost}</div>
                <p className="text-sm text-gray-600">{fee.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-primary-900 mb-4 text-center">
              Why Our Pricing is Different
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-primary-700 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">No Application Fees</h4>
                <p className="text-sm text-gray-700">Get started without upfront costs</p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary-700 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">No Exit Penalties</h4>
                <p className="text-sm text-gray-700">Repay early without additional charges</p>
              </div>
              <div className="text-center">
                <FileText className="h-12 w-12 text-primary-700 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Transparent Costs</h4>
                <p className="text-sm text-gray-700">All costs disclosed upfront</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How We Compare</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how AAGT Private Loans compares to traditional banking options for business
              funding.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <table className="w-full">
              <thead className="bg-primary-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Lender Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Interest Rate</th>
                  <th className="px-6 py-4 text-left font-semibold">Approval Time</th>
                  <th className="px-6 py-4 text-left font-semibold">Documentation</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {bankComparison.map((comparison, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${comparison.bank === 'AAGT Private' ? 'bg-primary-50' : ''}`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{comparison.bank}</td>
                    <td className="px-6 py-4 text-gray-700">{comparison.rate}</td>
                    <td className="px-6 py-4 text-gray-700">{comparison.approval}</td>
                    <td className="px-6 py-4 text-gray-700">{comparison.documentation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              * Rates shown are indicative and subject to individual assessment. Traditional bank
              rates shown are annual percentage rates (APR).
            </p>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Important Terms & Conditions
          </h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan Eligibility</h3>
                <p className="text-gray-700">
                  Loans are subject to credit assessment and approval. Minimum loan amount $150,000.
                  Maximum loan amount $5,000,000. Security required for all loans.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interest Rates</h3>
                <p className="text-gray-700">
                  Interest rates are calculated annually and may vary based on loan amount, term,
                  security, and individual circumstances. Rates shown are indicative only.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Repayment Terms</h3>
                <p className="text-gray-700">
                  Flexible repayment options available including interest-only payments during the
                  term. Principal and interest payments can be arranged to suit cash flow
                  requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Requirements</h3>
                <p className="text-gray-700">
                  All loans are secured by real estate or business assets. Professional valuations
                  are required for all security properties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsible Lending</h3>
                <p className="text-gray-700">
                  We are committed to responsible lending practices. All applications are assessed
                  for suitability and affordability in accordance with regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Personalized Rate?
          </h2>
          <p className="text-xl text-white/90 mb-8">{AppConfig.mission}</p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get a personalized rate quote based on your specific requirements. Our lending
            specialists will work with you to find the most competitive terms for your situation.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}
