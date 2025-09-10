'use client';

import { ArrowRight, CheckCircle, Clock, FileCheck, Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../../utils/Helpers';

export const PrestigeHero = () => {

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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div className="text-center lg:text-left">
            {/* Tagline */}
            <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
              Non bank lending solutions
            </p>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              No Doc Lending
              <span className="block text-primary-700">When The Banks Say No</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Direct lending from $150,000 to $5,000,000. No committees, no delays – just straightforward funding decisions.
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
                View Current Rates
              </Link>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <feature.icon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={getAssetPath("/images/zane-lee-9cnzCy4YsNE-unsplash.jpg")}
                alt="Professional business consultation and financial guidance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Fast</div>
                <div className="text-sm text-gray-600">Funding</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">Same Day</div>
                <div className="text-xs text-gray-600">Approval</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Trusted Australian Private Lender
          </p>
        </div>
      </div>
    </section>
  );
};