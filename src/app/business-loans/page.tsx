import { CallToAction } from '@/components/common/CallToAction';
import { LazyImage } from '@/components/common/LazyImage';
import { StructuredData } from '@/components/common/StructuredData';
import { loanProducts } from '@/data/loanProducts';
import { getAssetPath } from '@/utils/Helpers';
import { breadcrumbSchema } from '@/utils/structuredData';
import { ArrowRight, Building, CheckCircle, Clock, DollarSign, Target, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Business Loans | Fast Funding $150K-$5M',
    description:
      'Get business loans from $150,000 to $10,000,000 with same day approval and 4-day settlement. Direct funder with minimal documentation required.',
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
    description: 'Fast business funding from $150,000 to $10,000,000 with same day approval',
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

  // Filter business loan products
  const businessLoanProducts = loanProducts.filter(product => product.category === 'business');

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
    { icon: Clock, text: 'Same Day Approval', color: 'bg-blue-500' },
    { icon: Zap, text: '4-Day Settlement', color: 'bg-green-500' },
    { icon: Building, text: 'Direct Lender', color: 'bg-purple-500' },
    { icon: Target, text: 'Minimal Documentation', color: 'bg-orange-500' },
  ];

  const businessPurposes = [
    'Business expansion and growth initiatives',
    'Equipment and machinery purchases',
    'Business acquisitions and buyouts',
    'Commercial property purchases',
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
            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={getAssetPath("/images/sean-pollock-PhYq704ffdA-unsplash.jpg")}
                  alt="Business owner planning growth and expansion"
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
                  <div className="text-2xl font-bold text-green-600">$5M</div>
                  <div className="text-sm text-gray-600">Max Loan</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">Same Day</div>
                  <div className="text-xs text-gray-600">Approval</div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
                Business Funding Solutions
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Business Loans
                <span className="block text-primary-700">$150K - $5M</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                No doc, private lending for established businesses. No committees, no delays – just fast decisions when you need capital most.
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
                  href="/rates"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  View Rates
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

            
          </div>
        </div>
      </section>

      {/* Business Loan Products Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <LazyImage
            src={getAssetPath("/images/kevin-matos-Nl_FMFpXo2g-unsplash.jpg")}
            alt="Business growth and investment background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            rootMargin="100px"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
              Our Business Loan Products
            </h2>
            <div className="flex justify-center">
              <p className="text-primary-100 font-light max-w-2xl text-center">
                Tailored funding solutions designed specifically for growing Australian businesses
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 max-w-xl mx-auto justify-items-center">
            {businessLoanProducts.map((product) => (
              <div
                key={product.id}
                className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
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
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full mx-auto mb-2">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xs text-gray-600">Amount</div>
                      <div className="font-bold text-gray-900 text-sm">
                        {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full mx-auto mb-2">
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

      {/* Business Purposes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fund Your
                <span className="block text-primary-700">Business Growth</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our business loans are designed for established companies looking to expand, acquire assets, or strengthen their operations. Direct funding decisions mean you get the capital you need, fast.
              </p>
              
              <div className="space-y-4 mb-8">
                {businessPurposes.map((purpose, index) => (
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
                  Start Application
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <LazyImage
                  src={getAssetPath("/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg")}
                  alt="Business team planning growth strategy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  rootMargin="100px"
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

      {/* Final CTA Section */}
      <CallToAction />
    </>
  );
}
