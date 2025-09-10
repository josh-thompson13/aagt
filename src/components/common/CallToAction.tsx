'use client';

import { AppConfig } from '@/utils/AppConfig';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export const CallToAction = () => {

  return (
    <section className="py-16 bg-gradient-to-b from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 gap-12 items-center">
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

           
          </div>
        </div>
      </div>
    </section>
  );
};
