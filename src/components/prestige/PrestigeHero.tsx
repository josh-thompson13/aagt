'use client';

import QuickQuote from '@/components/QuickQuote';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PrestigeHero = () => {
  const router = useRouter();

  const handleApply = () => {
    router.push('/apply');
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-950 via-gray-900 to-black overflow-hidden">
      {/* Decorative Accent Bar */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-primary-500 via-primary-700 to-primary-900 rounded-r-xl shadow-xl" />

      {/* Optional: Subtle pattern overlay */}
      {/* <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none" /> */}

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Headline & CTA */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
              Private Business &amp; Investment Loans
            </h1>
            <div className="text-2xl md:text-3xl font-semibold text-primary-200 mb-4">
              from <span className="text-primary-400">$150,000</span> to <span className="text-primary-400">$5,000,000</span>
            </div>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl">
              <span className="font-medium text-primary-100">Same day approval.</span> <br className="hidden md:inline" />
              <span className="font-medium text-primary-100">Settlement within 4 days.</span> <br className="hidden md:inline" />
              <span className="text-primary-300">Direct funding from AAGT.</span>
            </p>
            <button
              onClick={handleApply}
              className="inline-flex items-center px-10 py-5 text-lg font-bold text-white bg-primary-700 hover:bg-primary-600 rounded-lg shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              Apply Now
              <ArrowRight className="ml-3 h-5 w-5" />
            </button>
          </div>

          {/* Right: QuickQuote Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-primary-100 p-8">
              <QuickQuote
                variant="compact"
                onApply={handleApply}
                className="bg-transparent shadow-none p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
