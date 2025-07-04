'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QuickQuote from '@/components/QuickQuote';

export const PrestigeHero = () => {
  const router = useRouter();

  const handleApply = () => {
    router.push('/apply');
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-900 to-primary-800">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/95 to-teal-800/90" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Private Business & Investment Loans<br />
                from $150,000 to $5,000,000
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Same day approval. Settlement within 4 days. Direct funding from AAGT.
              </p>
              
              <button
                onClick={handleApply}
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-xl"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            {/* Right side - Quick Quote */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <QuickQuote 
                  variant="compact"
                  onApply={handleApply}
                  className="bg-white/95 backdrop-blur-sm shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};