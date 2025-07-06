'use client';

import { DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: DollarSign,
    title: 'Business Loans',
    description:
      'Fast funding from $150,000 to $5,000,000 for any worthwhile business purpose. Same day approval with minimal documentation.',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
    link: '/business-loans',
  },
  {
    icon: TrendingUp,
    title: 'Investment Loans',
    description:
      'Flexible funding solutions for property investments, business expansion, or any profitable venture. Quick settlements within 4 days.',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    iconBg: 'bg-emerald-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200',
    link: '/investment-loans',
  },
];

export const LuxuryServices = () => {
  return (
    <section className="py-24 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
            Our Funding Solutions
          </h2>
          <div className="flex justify-center">
            <p className="text-primary-100 font-light max-w-2xl text-center">
              Direct lending solutions designed for business owners and investors who need quick,
              flexible funding
            </p>
          </div>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`p-8 border border-slate-200 transition-all duration-300 group rounded-xl ${service.bgColor} ${service.hoverBg} shadow-lg hover:shadow-xl hover:scale-105`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex p-4 ${service.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-3 text-slate-900 text-xl">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                
                {/* Button */}
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-primary-100 mb-6">
            Need funding fast? Start your application now for same day approval
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Submit Application
          </Link>
        </div>
      </div>
    </section>
  );
};
