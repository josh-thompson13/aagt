import { CallToAction } from '@/components/common/CallToAction';
import { StructuredData } from '@/components/common/StructuredData';
import { loanProducts } from '@/data/loanProducts';
import { getAssetPath } from '@/utils/Helpers';
import { breadcrumbSchema } from '@/utils/structuredData';
import { ArrowRight, Building2, CheckCircle, Clock, DollarSign, Target, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

  const keyFeatures = [
    { icon: Clock, text: 'Fast Approvals', color: 'bg-emerald-500' },
    { icon: Zap, text: 'Quick Settlements', color: 'bg-blue-500' },
    { icon: Building2, text: 'Portfolio Lending', color: 'bg-purple-500' },
    { icon: Target, text: 'Flexible Terms', color: 'bg-orange-500' },
  ];

  const investmentPurposes = [
    'Property development and construction projects',
    'Off-the-plan property purchases',
    'Commercial and residential investment properties',
    'Investment portfolio expansion',
    'Strategic business investments',
    'Second mortgage and equity release',
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={loanProductSchema} />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="text-center lg:text-left">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
                Investment Funding Solutions
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Investment Loans
                <span className="block text-primary-700">Build Your Portfolio</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Flexible funding for property investments, developments, and strategic opportunities. When traditional lenders won't support your vision, we will.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Calculate Returns
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
                  src={getAssetPath("/images/ryoji-iwata-wUZjnOv7t0g-unsplash.jpg")}
                  alt="Modern property investment and development"
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
                  <div className="text-2xl font-bold text-emerald-600">70%</div>
                  <div className="text-sm text-gray-600">Max LVR</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">48 Hrs</div>
                  <div className="text-xs text-gray-600">Approval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Loan Products Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <Image
            src={getAssetPath("/images/kevin-matos-Nl_FMFpXo2g-unsplash.jpg")}
            alt="Investment and development background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
              Our Investment Loan Products
            </h2>
            <div className="flex justify-center">
              <p className="text-primary-100 font-light max-w-2xl text-center">
                Specialized funding solutions for property investors and strategic business investments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {investmentLoanProducts.map((product) => (
              <div
                key={product.id}
                className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
              >
                {/* Product Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
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
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full mx-auto mb-2">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xs text-gray-600">Amount</div>
                      <div className="font-bold text-gray-900 text-sm">
                        {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full mx-auto mb-2">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xs text-gray-600">Rate from</div>
                      <div className="font-bold text-gray-900 text-sm">
                        {formatRate(product.minRate)} p.a.
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full mx-auto mb-2">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xs text-gray-600">Approval</div>
                      <div className="font-bold text-gray-900 text-sm">
                        {product.turnaroundTime.approval}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/apply"
                    className="px-6 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Purposes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getAssetPath("/images/amina-atar-tAPxuPCThxY-unsplash.jpg")}
                  alt="Investment planning and portfolio growth"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-1">$100M+</div>
                  <div className="text-sm text-gray-600">Funded</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Build Your
                <span className="block text-primary-700">Investment Portfolio</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                From property development to strategic acquisitions, our investment loans provide the flexibility and speed you need to capitalize on opportunities in today's market.
              </p>
              
              <div className="space-y-4 mb-8">
                {investmentPurposes.map((purpose, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full" />
                    <span className="text-gray-700">{purpose}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Investment Application
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Discuss Your Strategy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Investment Success
                <span className="block text-primary-700">Built on Experience</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our deep understanding of property markets and investment strategies means we can structure loans that work for your specific goals. We're not just lenders – we're partners in your success.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Specialist investment loan structuring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Portfolio lending and cross-collateralization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Flexible exit strategies and refinancing</span>
                </div>
              </div>
              <Link
                href="/rates"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                View Current Rates
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getAssetPath("/images/mario-gogh-VBLHICVh-lI-unsplash.jpg")}
                  alt="Successful investment partnership and consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Investment Loans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <CallToAction />
    </>
  );
}