import { CallToAction } from '@/components/common/CallToAction';
import { StructuredData } from '@/components/common/StructuredData';
import { getAssetPath } from '@/utils/Helpers';
import { breadcrumbSchema } from '@/utils/structuredData';
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  Shield,
  TrendingDown,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

  const keyFeatures = [
    { icon: TrendingDown, text: 'Competitive Rates', color: 'bg-green-500' },
    { icon: Calculator, text: 'Transparent Fees', color: 'bg-blue-500' },
    { icon: Clock, text: 'Flexible Terms', color: 'bg-purple-500' },
    { icon: Shield, text: 'No Hidden Charges', color: 'bg-orange-500' },
  ];

  const loanTypes = [
    {
      type: 'Business Loans',
      purpose: 'Business expansion and working capital',
      rateRange: '8.95 - 12.95% p.a.',
      lvrMax: 'Up to 70% LVR',
      termOptions: '1-24 months',
      amount: '$150,000 - $5,000,000',
      features: [
        'Same-day approval available',
        'Settlement within 4 working days',
        'Interest-only repayment options',
        'Flexible security arrangements',
        'No early exit fees',
        'Direct lender - our own funds',
      ],
      gradient: 'from-blue-50 to-blue-100',
      hoverGradient: 'hover:from-blue-100 hover:to-blue-200',
    },
    {
      type: 'Investment Loans', 
      purpose: 'Property investment and development',
      rateRange: '9.25 - 13.25% p.a.',
      lvrMax: 'Up to 70% LVR',
      termOptions: '1-24 months', 
      amount: '$200,000 - $5,000,000',
      features: [
        'Portfolio lending available',
        'Off-the-plan finance specialists',
        'Professional investor rates',
        'Fast property settlements',
        'Cross-collateralization options',
        'Expert property assessment',
      ],
      gradient: 'from-emerald-50 to-emerald-100',
      hoverGradient: 'hover:from-emerald-100 hover:to-emerald-200',
    },
    {
      type: 'Second Mortgages',
      purpose: 'Additional capital without refinancing',
      rateRange: '11.95 - 16.95% p.a.',
      lvrMax: 'Up to 85% combined LVR',
      termOptions: '1-18 months',
      amount: '$150,000 - $1,500,000',
      features: [
        'Keep your existing mortgage',
        'Access locked-in equity',
        'Multiple purpose options',
        'Competitive second position rates',
        'No refinancing required',
        'Quick equity release',
      ],
      gradient: 'from-amber-50 to-amber-100', 
      hoverGradient: 'hover:from-amber-100 hover:to-amber-200',
    },
  ];

  const comparisonData = [
    { metric: 'Approval Time', aagt: '24 hours', banks: '2-8 weeks' },
    { metric: 'Settlement', aagt: '4 days', banks: '4-12 weeks' },
    { metric: 'Documentation', aagt: 'Minimal', banks: 'Extensive' },
    { metric: 'Committee Process', aagt: 'Direct decision', banks: 'Multiple committees' },
    { metric: 'Flexibility', aagt: 'High', banks: 'Limited' },
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
    interestRate: '8.95 - 16.95% per annum',
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
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="text-center lg:text-left">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
                Transparent Pricing
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Competitive Rates
                <span className="block text-primary-700">& Transparent Terms</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                No hidden fees, no surprises. Just straightforward lending with competitive rates designed for your business success.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Your Rate Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Calculate Payments
                </Link>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 ${feature.color} rounded-lg`}>
                      <feature.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={getAssetPath("/images/redd-francisco-5U_28ojjgms-unsplash.jpg")}
                  alt="Financial planning and competitive rates"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8.95%</div>
                  <div className="text-sm text-gray-600">Starting Rate</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">24 Hrs</div>
                  <div className="text-xs text-gray-600">Quote Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Rates Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <Image
            src={getAssetPath("/images/kevin-matos-Nl_FMFpXo2g-unsplash.jpg")}
            alt="Professional lending rates background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
              Current Loan Rates
            </h2>
            <div className="flex justify-center">
              <p className="text-primary-100 font-light max-w-2xl text-center">
                Competitive rates across all our lending products with transparent terms and conditions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <div
                key={index}
                className={`p-8 bg-gradient-to-br ${loan.gradient} ${loan.hoverGradient} border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm`}
              >
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{loan.type}</h3>
                  <p className="text-gray-600 mb-4">{loan.purpose}</p>
                  <div className="text-3xl font-bold text-primary-700 mb-2">{loan.rateRange}</div>
                  <div className="text-lg text-gray-700 font-medium">{loan.amount}</div>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">LVR</span>
                    <span className="font-semibold text-gray-900">{loan.lvrMax}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Term</span>
                    <span className="font-semibold text-gray-900">{loan.termOptions}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="space-y-2">
                    {loan.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link
                    href="/apply"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/calculator"
                    className="px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Calculate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose
                <span className="block text-primary-700">AAGT Private Loans?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Compare our streamlined approach with traditional bank lending. We focus on speed, flexibility, and transparent terms that work for your business.
              </p>
              
              <div className="space-y-4 mb-8">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{item.metric}</span>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">AAGT</div>
                        <div className="font-bold text-primary-700">{item.aagt}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Banks</div>
                        <div className="font-medium text-gray-600">{item.banks}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Your Rate Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Speak to a Specialist
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getAssetPath("/images/images/jamie-davies-Hao52Fu9-F8-unsplash.jpg")}
                  alt="Professional lending consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Approval Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Important Terms & Conditions
            </h2>
            <p className="text-lg text-gray-600">
              Transparent lending terms you can understand and trust
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan Eligibility</h3>
                  <p className="text-gray-700">
                    Loans are subject to credit assessment and approval. Minimum loan amount $150,000. Security required for all loans.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interest Rates</h3>
                  <p className="text-gray-700">
                    Rates are calculated annually and may vary based on loan amount, term, security, and individual circumstances.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Fees Structure</h3>
                  <p className="text-gray-700">
                    Establishment fees typically 1-2% of loan amount. No ongoing fees or hidden charges.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Repayment Options</h3>
                  <p className="text-gray-700">
                    Flexible repayment options including interest-only payments. Terms structured to suit your cash flow.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Requirements</h3>
                  <p className="text-gray-700">
                    All loans secured by real estate or business assets. Professional valuations required for security properties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Process</h3>
                  <p className="text-gray-700">
                    Applications assessed for suitability and affordability according to our lending criteria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CallToAction />
    </>
  );
}