'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/utils/Helpers';
import { Home, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image
              src={getAssetPath("/images/aagt_logo_no_background.png")}
              alt="AAGT Private Loans Logo"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's help you find the 
            funding solutions you need.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-primary-200 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-700 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-primary-200 transition-all duration-200"
          >
            <Calculator className="w-5 h-5" />
            Apply for Funding
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-600 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/business-loans"
              className="text-primary-700 hover:text-primary-800 underline"
            >
              Business Loans
            </Link>
            <Link
              href="/investment-loans"
              className="text-primary-700 hover:text-primary-800 underline"
            >
              Investment Loans
            </Link>
            <Link
              href="/rates"
              className="text-primary-700 hover:text-primary-800 underline"
            >
              Rates & Terms
            </Link>
            <Link
              href="/contact"
              className="text-primary-700 hover:text-primary-800 underline"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-30"></div>
          </div>
          <div className="relative">
            <svg
              className="w-64 h-64 mx-auto text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}