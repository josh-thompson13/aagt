import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import { ArrowRight, CheckCircle2, DollarSign, Clock, Building, BarChart3 } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Investment Loans | Property & Business Investment Funding',
    description: 'Flexible investment loans for property development, off-the-plan purchases, and business investments. Fast approvals from $150,000 to $5,000,000.',
    keywords: 'investment loans Australia, property investment finance, development finance, off the plan funding, business investment loans',
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
      features: ['Construction finance', 'Development funding', 'Progress payments', 'Exit strategies']
    },
    {
      title: 'Off-the-Plan Finance',
      description: 'Specialized funding for off-the-plan property purchases and settlements',
      features: ['Deposit bridging', 'Settlement finance', 'Flexible terms', 'Quick approvals']
    },
    {
      title: 'Business Investments',
      description: 'Capital for business acquisitions, expansions, and investment opportunities',
      features: ['Asset acquisition', 'Business expansion', 'Equipment finance', 'Working capital']
    },
    {
      title: 'Commercial Property',
      description: 'Funding for commercial property investments and refinancing',
      features: ['Commercial purchases', 'Refinancing options', 'Rental property finance', 'Portfolio expansion']
    }
  ];

  const loanProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    'name': 'Investment Loans',
    'description': 'Flexible investment loans for property development, off-the-plan purchases, and business investments',
    'provider': {
      '@type': 'FinancialService',
      'name': 'AAGT Private Loans',
    },
    'interestRate': 'Competitive rates for investment funding',
    'feesAndCommissionsSpecification': 'Transparent fee structure',
    'amount': {
      '@type': 'MonetaryAmount',
      'minValue': 150000,
      'maxValue': 5000000,
      'currency': 'AUD'
    }
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
              Investment Loans for Smart Growth
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Flexible funding solutions for property development, off-the-plan purchases, and strategic business investments
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
                Discuss Your Investment
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <feature.icon className="h-12 w-12 text-primary-700 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Investment Loan Solutions
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Whether you're developing property, purchasing off-the-plan, or expanding your business, 
              we provide tailored funding solutions for sophisticated investors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-700 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose AAGT for Investment Funding?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                As experienced investment loan specialists, we understand the unique requirements 
                of property developers, investors, and business owners seeking growth capital.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Direct Funding:</span>
                    <span className="text-gray-700 ml-1">No committee delays or bank bureaucracy</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Flexible Terms:</span>
                    <span className="text-gray-700 ml-1">Tailored solutions for each investment</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Fast Settlements:</span>
                    <span className="text-gray-700 ml-1">Don't miss investment opportunities</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Expert Guidance:</span>
                    <span className="text-gray-700 ml-1">Specialist advice throughout the process</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-primary-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">Investment Loan Details</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Loan Amount</h4>
                  <p className="text-2xl font-bold text-primary-700">$150,000 - $5,000,000</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">LVR</h4>
                  <p className="text-2xl font-bold text-primary-700">Up to 70%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Term Options</h4>
                  <p className="text-2xl font-bold text-primary-700">1-24 Months</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Interest Options</h4>
                  <p className="text-2xl font-bold text-primary-700">Flexible Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Fund Your Next Investment?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Don't let funding delays cost you investment opportunities. Get approved fast with AAGT Private Loans.
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our investment loan specialists understand time-sensitive opportunities. We provide the speed 
            and flexibility you need to secure profitable investments.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}