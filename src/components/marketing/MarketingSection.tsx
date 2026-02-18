'use client';

import { AppConfig } from '@/utils/AppConfig';
import { ArrowRight, Clock, DollarSign, FileCheck, Shield } from 'lucide-react';
import Link from 'next/link';

export const MarketingSection = () => {
  return (
    <section className="py-20 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            Professional Private Lending Solutions
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-10 font-normal max-w-3xl text-center leading-relaxed">
            {AppConfig.primaryMessage}. As direct funders, we provide streamlined approval processes
            and competitive terms for qualified borrowers.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative max-w-6xl mx-auto rounded-3xl shadow-2xl bg-white">
          <div className="p-8 md:p-14 lg:p-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-16">
              {/* Left: Value Proposition */}
              <div className="flex-1 min-w-0 md:pr-8">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                  Why Choose AAGT Private Loans
                </h3>
                <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                  As a direct lender using proprietary funds, we offer faster decision-making and
                  flexible solutions. Our streamlined processes deliver same-day approvals and 4-day
                  settlements, compared to traditional banks that often require weeks.
                </p>
                <ul className="mb-10 space-y-2 text-base text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary-700" />
                    Direct funding from $150,000 to $10,000,000
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary-700" />
                    Same day approval with minimal documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary-700" />
                    Settlement within 4 working days
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary-700" />
                    Second mortgages up to 75% LVR
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-7 py-2.5 text-base font-semibold rounded-full text-white bg-primary-700 hover:bg-primary-800 shadow transition-all duration-150 focus:ring-2 focus:ring-primary-300 focus:outline-none"
                    style={{
                      boxShadow: '0 2px 16px 0 rgba(16, 112, 202, 0.10)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/rates"
                    className="inline-flex items-center justify-center px-7 py-2.5 text-base font-semibold rounded-full text-primary-700 border border-primary-700 bg-white hover:bg-primary-50 hover:text-primary-900 shadow transition-all duration-150 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                    style={{
                      boxShadow: '0 2px 16px 0 rgba(16, 112, 202, 0.06)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    View Rates
                  </Link>
                </div>
              </div>
              {/* Right: Visual */}
              <div className="flex-1 flex items-center justify-center min-w-0 md:pl-8">
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-xl border border-accent-600 bg-gradient-to-br from-primary-100 to-primary-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <DollarSign className="w-24 h-24 text-primary-700 mx-auto mb-4" />
                      <h4 className="text-2xl font-bold text-primary-900 mb-2">
                        Funding Available
                      </h4>
                      <p className="text-4xl font-bold text-primary-700">$150K - $5M</p>
                      <p className="text-lg text-primary-600 mt-2">
                        For any worthwhile business purpose
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Motto */}
            <div className="mt-14 pt-8 border-t border-slate-200 text-center">
              <p className="text-xl md:text-2xl text-primary-700 font-bold">{AppConfig.mission}</p>
              <p className="text-base text-slate-600 mt-2 italic">
                Professional lending solutions tailored to your business requirements
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary-700" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl text-slate-900 mb-4 font-semibold">
              Same Day Approval
            </h3>
            <p className="text-slate-600 text-base">Quick decisions when you need them most</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-primary-700" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl text-slate-900 mb-4 font-semibold">
              Minimal Documents
            </h3>
            <p className="text-slate-600 text-base">Simple process, no excessive paperwork</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-primary-700" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl text-slate-900 mb-4 font-semibold">Direct Funder</h3>
            <p className="text-slate-600 text-base">We lend our own funds - no middlemen</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-700" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl text-slate-900 mb-4 font-semibold">Flexible Terms</h3>
            <p className="text-slate-600 text-base">Solutions tailored to your business needs</p>
          </div>
        </div>
      </div>
    </section>
  );
};
