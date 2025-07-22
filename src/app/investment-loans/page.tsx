import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import { CheckCircle2, DollarSign, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { loanProducts } from '@/data/loanProducts';

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

  // Filter investment loan products
  const investmentLoanProducts = loanProducts.filter(product => 
    product.category === 'investment' || product.category === 'property' || product.category === 'personal'
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRate = (rate: number) => {
    return `${rate.toFixed(2)}%`;
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
      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Simple Requirements
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Clear investment strategy</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Exit plan or refinance strategy</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Security available (property or assets)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-lg text-slate-200">Investment experience or professional advice</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Investment Loan Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Our Investment Loan Products
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentLoanProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                      <p className="text-gray-600">{product.shortDescription}</p>
                    </div>
                    <div className="flex gap-2">
                      {product.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                      {product.popular && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full mx-auto mb-2">
                        <DollarSign className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="text-sm text-gray-600">Amount</div>
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm text-gray-600">Rate from</div>
                      <div className="font-semibold text-gray-900">
                        {formatRate(product.minRate)} p.a.
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm text-gray-600">Approval</div>
                      <div className="font-semibold text-gray-900">
                        {product.turnaroundTime.approval}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {product.features.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {product.features.length > 4 && (
                      <div className="text-sm text-gray-500 mt-1">
                        +{product.features.length - 4} more features
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/loan-products/${product.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/calculator"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Calculate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
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