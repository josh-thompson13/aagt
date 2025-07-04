import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import QuickQuote from '@/components/QuickQuote';
import { Calculator, Clock, TrendingUp, CheckCircle } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Quick Quote Calculator | AAGT Private Loans',
    description:
      'Calculate your loan interest and total repayment amount instantly. Get quick quotes for business loans from $150,000 to $5,000,000.',
    keywords:
      'loan calculator, business loan quote, private loan calculator, quick quote, loan interest calculator',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au/calculator',
    },
  };
}

export default function CalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aagtprivateloans.com.au' },
    { name: 'Calculator', url: 'https://aagtprivateloans.com.au/calculator' },
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Instant Calculations',
      description: 'Get immediate estimates for your loan interest and total repayment amount',
    },
    {
      icon: Clock,
      title: 'Simple Terms',
      description: 'Choose loan terms from 1 to 24 months to match your business needs',
    },
    {
      icon: TrendingUp,
      title: 'Transparent Pricing',
      description: "See exactly what you'll pay with no hidden fees or surprises",
    },
    {
      icon: CheckCircle,
      title: 'Quick Application',
      description: 'Ready to apply? Get your full quote and start the approval process',
    },
  ];

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AAGT Private Loans Calculator',
    description: 'Quick quote calculator for business loans from $150,000 to $5,000,000',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    featureList: [
      'Instant loan calculations',
      'Term options from 1-24 months',
      'Transparent interest rates',
      'No hidden fees',
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={calculatorSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Quick Quote Calculator
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get instant estimates for your business loan with our simple calculator
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Calculator */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Calculate Your Loan
                </h2>
                <p className="text-lg text-gray-700">
                  Enter your loan amount and term to see your total interest and repayment amount.
                </p>
              </div>
              <QuickQuote className="max-w-lg mx-auto lg:mx-0" />
            </div>

            {/* Right side - Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose Our Calculator?
                </h3>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-teal-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                      1
                    </span>
                    Enter your desired loan amount ($150,000 - $5,000,000)
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                      2
                    </span>
                    Select your preferred loan term (1-24 months)
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                      3
                    </span>
                    See your total interest and repayment amount instantly
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                      4
                    </span>
                    Click "Get Full Quote" to start your application
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Important Information
            </h2>
            <p className="text-lg text-gray-700">
              Please note the following terms and conditions for our loan calculator
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Parameters</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Minimum loan amount: $150,000</li>
                <li>• Maximum loan amount: $5,000,000</li>
                <li>• Loan terms: 1 to 24 months</li>
                <li>• Interest rate: 1.2% per month (indicative)</li>
                <li>• Interest-only payment structure</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Disclaimers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Calculations are estimates only</li>
                <li>• Final rates subject to assessment</li>
                <li>• Additional fees may apply</li>
                <li>• All loans subject to approval</li>
                <li>• Terms and conditions apply</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              This calculator provides estimates based on the information you provide. Actual loan
              terms, rates, and fees may vary based on your individual circumstances and are subject
              to our standard credit assessment and approval process.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Apply?</h2>
          <p className="text-xl text-white/90 mb-8">
            Turn your quick quote into a full loan application and get approved today.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}
