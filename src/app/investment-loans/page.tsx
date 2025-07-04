import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import { ArrowRight, CheckCircle2, DollarSign, Clock, Building, BarChart3 } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Investment Loans | Property & Business Investment Funding',
    description:
      'Flexible investment loans for property development, off-the-plan purchases, and business investments. Fast approvals from $150,000 to $5,000,000.',
    keywords:
      'investment loans Australia, property investment finance, development finance, off the plan funding, business investment loans',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au/investment-loans',
    },
  };
}

export default function InvestmentLoansPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aagtprivateloans.com.au' },
    { name: 'Investment Loans', url: 'https://aagtprivateloans.com.au/investment-loans' },
  ];

  const features = [
    { icon: DollarSign, text: 'Loans from $150,000 to $5,000,000' },
    { icon: Clock, text: 'Fast approval process' },
    { icon: Building, text: 'Property & business investments' },
    { icon: BarChart3, text: 'Flexible LVR up to 70%' },
  ];

  const investmentTypes = [
    {
      title: 'Property Development',
      description: 'Funding for residential and commercial property development projects',
      features: [
        'Construction finance',
        'Development funding',
        'Progress payments',
        'Exit strategies',
      ],
    },
    {
      title: 'Off-the-Plan Finance',
      description: 'Specialized funding for off-the-plan property purchases and settlements',
      features: ['Deposit bridging', 'Settlement finance', 'Flexible terms', 'Quick approvals'],
    },
    {
      title: 'Business Investments',
      description: 'Capital for business acquisitions, expansions, and investment opportunities',
      features: ['Asset acquisition', 'Business expansion', 'Equipment finance', 'Working capital'],
    },
    {
      title: 'Commercial Property',
      description: 'Funding for commercial property investments and refinancing',
      features: [
        'Commercial purchases',
        'Refinancing options',
        'Rental property finance',
        'Portfolio expansion',
      ],
    },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Investment Loans for Smart Growth
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal max-w-3xl mx-auto">
              Flexible funding solutions for property development, off-the-plan purchases, and
              strategic business investments. Fast approvals from $150,000 to $5,000,000.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition duration-150"
              >
                Discuss Your Investment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Investment Loan Benefits
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive funding solutions designed for sophisticated investors and developers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const gradientBg = index % 4 === 0 ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 
                                index % 4 === 1 ? 'bg-gradient-to-br from-teal-50 to-teal-100' : 
                                index % 4 === 2 ? 'bg-gradient-to-br from-green-50 to-green-100' : 
                                'bg-gradient-to-br from-yellow-50 to-yellow-100';
              const hoverBg = index % 4 === 0 ? 'hover:from-blue-100 hover:to-blue-200' : 
                             index % 4 === 1 ? 'hover:from-teal-100 hover:to-teal-200' : 
                             index % 4 === 2 ? 'hover:from-green-100 hover:to-green-200' : 
                             'hover:from-yellow-100 hover:to-yellow-200';
              const iconBg = index % 4 === 0 ? 'bg-blue-600' : 
                            index % 4 === 1 ? 'bg-teal-600' : 
                            index % 4 === 2 ? 'bg-green-600' : 
                            'bg-yellow-600';
              
              return (
                <div
                  key={index}
                  className={`p-8 border border-gray-200 transition-all duration-300 group rounded-xl ${gradientBg} ${hoverBg} hover:shadow-lg hover:scale-105 text-center bg-white shadow-sm`}
                >
                  <div className={`inline-flex p-4 ${iconBg} rounded-full shadow-md mb-4`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.text}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Investment Loan Solutions
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Whether you're developing property, purchasing off-the-plan, or expanding your
              business, we provide tailored funding solutions for sophisticated investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentTypes.map((type, index) => {
              const gradientBg = index % 4 === 0 ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 
                                index % 4 === 1 ? 'bg-gradient-to-br from-teal-50 to-teal-100' : 
                                index % 4 === 2 ? 'bg-gradient-to-br from-green-50 to-green-100' : 
                                'bg-gradient-to-br from-yellow-50 to-yellow-100';
              const hoverBg = index % 4 === 0 ? 'hover:from-blue-100 hover:to-blue-200' : 
                             index % 4 === 1 ? 'hover:from-teal-100 hover:to-teal-200' : 
                             index % 4 === 2 ? 'hover:from-green-100 hover:to-green-200' : 
                             'hover:from-yellow-100 hover:to-yellow-200';
              
              return (
                <div
                  key={index}
                  className={`p-8 border border-gray-200 transition-all duration-300 group rounded-xl ${gradientBg} ${hoverBg} hover:shadow-lg hover:scale-105 bg-white shadow-sm`}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{type.title}</h3>
                  <p className="text-slate-600 mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose AAGT for Investment Funding?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              As experienced investment loan specialists, we understand the unique requirements of
              property developers, investors, and business owners seeking growth capital.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Direct Funding:</span>
                    <span className="text-white/90 ml-1">
                      No committee delays or bank bureaucracy
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Flexible Terms:</span>
                    <span className="text-white/90 ml-1">
                      Tailored solutions for each investment
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Fast Settlements:</span>
                    <span className="text-white/90 ml-1">Don't miss investment opportunities</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Expert Guidance:</span>
                    <span className="text-white/90 ml-1">
                      Specialist advice throughout the process
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Investment Loan Details</h3>
              <div className="space-y-4">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-white">Loan Amount</h4>
                  <p className="text-2xl font-bold text-white">$150,000 - $5,000,000</p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-white">LVR</h4>
                  <p className="text-2xl font-bold text-white">Up to 70%</p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-white">Term Options</h4>
                  <p className="text-2xl font-bold text-white">1-24 Months</p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-white">Interest Options</h4>
                  <p className="text-2xl font-bold text-white">Flexible Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ready to Fund Your Next Investment?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Don't let funding delays cost you investment opportunities. Get approved fast with AAGT
            Private Loans.
          </p>
          <p className="text-base text-slate-600 mb-8 max-w-2xl mx-auto">
            Our investment loan specialists understand time-sensitive opportunities. We provide the
            speed and flexibility you need to secure profitable investments.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}
