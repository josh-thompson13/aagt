'use client';

import { ArrowRight, CheckCircle2, Clock, DollarSign, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AppConfig } from '@/utils/AppConfig';

export const PrestigeHero = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/apply?amount=${encodeURIComponent(loanAmount)}`);
  };

  const formatLoanAmount = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    const numberValue = parseInt(cleanValue) || 0;
    return numberValue.toLocaleString('en-AU');
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLoanAmount(e.target.value);
    setLoanAmount(formatted);
  };

  // Timeout fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true);
        setImageError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [imageLoaded]);

  const features = [
    { icon: Clock, text: 'Same Day Approval' },
    { icon: DollarSign, text: '$150K to $5M Funding' },
    { icon: FileText, text: 'Minimal Documentation' },
    { icon: CheckCircle2, text: '4-Day Settlement' },
  ];

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Error State - Show content anyway */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700"></div>
      )}

      {/* Background with professional business/finance theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          {/* Main Content Card */}
          <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl">
            {/* Company Tagline */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">
                {AppConfig.tagline}
              </h2>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Business Loans Made Simple
            </h1>

            {/* Key Message */}
            <p className="text-lg md:text-xl text-slate-700 mb-4 font-semibold">
              {AppConfig.primaryMessage}
            </p>

            {/* Subheading */}
            <p className="text-lg text-slate-600 mb-10 font-normal">
              Direct funding from $150,000 to $5,000,000 • No complex committees
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-primary-50 rounded-lg">
                  <feature.icon className="h-8 w-8 text-primary-700 mb-2" />
                  <span className="text-sm font-medium text-slate-700 text-center">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Loan Amount Form */}
            <form onSubmit={handleApply} className="mb-6 space-y-4">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-slate-700 mb-2">
                  How much funding do you need?
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-lg font-semibold">
                    $
                  </span>
                  <input
                    type="text"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    placeholder="Enter amount (e.g., 500,000)"
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Loans available from $150,000 to $5,000,000
                </p>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-lg font-bold rounded-lg text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start FAST 🚀 🚀 🚀 Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Additional CTAs */}
            <p className="text-slate-600 mt-8 text-sm">
              Or explore our loan products:
              <a
                href="/business-loans"
                className="mx-2 text-primary-600 hover:text-primary-700 underline"
              >
                Business Loans
              </a>
              •
              <a
                href="/investment-loans"
                className="mx-2 text-primary-600 hover:text-primary-700 underline"
              >
                Investment Loans
              </a>
              •
              <a
                href="/rates"
                className="mx-2 text-primary-600 hover:text-primary-700 underline"
              >
                Rates & Fees
              </a>
            </p>

            {/* Trust Signal */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-lg font-bold text-slate-800">{AppConfig.slogan}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};