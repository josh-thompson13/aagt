'use client';

import { ArrowRight, CheckCircle, Clock, FileCheck, Shield, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PrestigeHero = () => {
  const router = useRouter();

  const handleApply = () => {
    router.push('/apply');
  };

  const handleViewRates = () => {
    router.push('/rates');
  };

  const keyFeatures = [
    { icon: Clock, text: 'Same Day Approval' },
    { icon: FileCheck, text: 'Minimal Documentation' },
    { icon: Shield, text: 'Direct Lender - No Brokers' },
    { icon: TrendingUp, text: '4-Day Settlement' },
  ];

  // Removed unused loanTypes variable

  return (
    <section className="relative bg-white">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Main Content */}
        <div className="text-center mb-16">
          {/* Tagline */}
          <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
            Alternative Business Funding Solutions
          </p>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Fast Business Funding
            <span className="block text-primary-700">When Banks Say No</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Direct lending from $150,000 to $5,000,000. No committees, no delays – just straightforward funding decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleApply}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={handleViewRates}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              View Current Rates
            </button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-gray-700">
                <feature.icon className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>


        

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Trusted Australian Private Lender
          </p>
        </div>
      </div>
    </section>
  );
};