'use client';

import {
  Building2,
  DollarSign,
  FileText,
  Home,
  Percent,
  TrendingUp,
} from 'lucide-react';

const services = [
  {
    icon: DollarSign,
    title: 'Business Loans',
    description: 'Fast funding from $150,000 to $5,000,000 for any worthwhile business purpose. Same day approval with minimal documentation.',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
  },
  {
    icon: TrendingUp,
    title: 'Investment Loans',
    description: 'Flexible funding solutions for property investments, business expansion, or any profitable venture. Quick settlements within 4 days.',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    iconBg: 'bg-emerald-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200',
  },
  {
    icon: Building2,
    title: 'Off-the-Plan Finance',
    description: 'Special financing solutions for off-the-plan property purchases. Competitive rates and flexible terms for your investment.',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    iconBg: 'bg-purple-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
  },
  {
    icon: Home,
    title: 'Second Mortgages',
    description: 'Access equity in your property with second mortgages up to 70% LVR. No complex credit committees, just straightforward decisions.',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    iconBg: 'bg-amber-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200',
  },
  {
    icon: FileText,
    title: 'Short-Term Funding',
    description: 'Bridge the gap with short-term funding solutions. Perfect for time-sensitive opportunities or temporary cash flow needs.',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    iconBg: 'bg-red-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-red-100 hover:to-red-200',
  },
  {
    icon: Percent,
    title: 'Competitive Rates',
    description: 'Better rates than major banks with our fee-free approval process. Compare our rates with NAB, CBA, Westpac, and ANZ.',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    iconBg: 'bg-indigo-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-indigo-100 hover:to-indigo-200',
  },
];

export const LuxuryServices = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-slate-900">
            Our Funding Solutions
          </h2>
          <div className="flex justify-center">
            <p className="text-slate-600 font-light max-w-2xl text-center">
              Direct lending solutions designed for business owners and investors who need quick, flexible funding
            </p>
          </div>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`p-8 border border-slate-200 transition-all duration-300 group rounded-xl ${service.bgColor} ${service.hoverBg} shadow-lg hover:shadow-xl hover:scale-105`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 ${service.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="h-8 w-8 text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-3 text-slate-900 text-lg">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Need funding fast? Start your application now for same day approval
          </p>
          <a href="/apply" className="inline-flex items-center gap-2 px-8 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            Submit Application
          </a>
        </div>
      </div>
    </section>
  );
};