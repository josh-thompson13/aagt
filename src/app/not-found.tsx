'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/utils/Helpers';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src={getAssetPath("/images/logo.svg")}
              alt="Realty Direct Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <span className="font-bold text-2xl text-blue-700">Realty Direct</span>
          </Link>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Oops! The property you're looking for seems to have been sold or moved. 
            Let's help you find what you're searching for.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
          >
            <Search className="w-5 h-5" />
            Browse Properties
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-600 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/buying"
              className="text-blue-700 hover:text-blue-800 underline"
            >
              Buying
            </Link>
            <Link
              href="/selling"
              className="text-blue-700 hover:text-blue-800 underline"
            >
              Selling
            </Link>
            <Link
              href="/renting"
              className="text-blue-700 hover:text-blue-800 underline"
            >
              Renting
            </Link>
            <Link
              href="/contact"
              className="text-blue-700 hover:text-blue-800 underline"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}