'use client';

import { ArrowRight, Phone, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppConfig } from '@/utils/AppConfig';

export const CallToAction = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loanAmount.trim()) {
      alert('Please enter a loan amount.');
      return;
    }
    // Redirect to application with loan amount
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

  return (
    <section className="py-16 bg-gradient-to-b from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Secure Your Business Funding?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                {AppConfig.primaryMessage}. Receive same-day approval and settlement within four
                business days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md shadow-lg hover:shadow-xl bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-200 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-4 border border-white text-base font-medium rounded-md shadow-lg hover:shadow-xl bg-transparent hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Speak to a Specialist
                </Link>
              </div>

              <p className="text-primary-100 flex items-center gap-2">
                <span>Require urgent funding?</span>
                <Link href="/contact" className="font-bold hover:underline">
                  Contact us today
                </Link>
              </p>
            </div>

            {/* Right Column - Loan Calculator */}
            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-primary-800">Quick Funding Calculator</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="loan-amount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    How much funding do you need?
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                      $
                    </span>
                    <input
                      id="loan-amount"
                      type="text"
                      value={loanAmount}
                      onChange={handleLoanAmountChange}
                      placeholder="Enter amount (e.g., 500,000)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Loans available from ${AppConfig.loanRange.min.toLocaleString('en-AU')} to $
                    {AppConfig.loanRange.max.toLocaleString('en-AU')}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg hover:shadow-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Start Application
                  <Calculator className="ml-2 h-5 w-5" />
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-500">
                Get same day approval for your business funding needs. No complex committees or
                lengthy processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
