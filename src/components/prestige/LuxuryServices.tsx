'use client';

import {
  Building2,
  Camera,
  Globe,
  Handshake,
  Shield,
  TrendingUp,
} from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Property Sales & Acquisitions',
    description: 'Expert guidance through every step of buying or selling your property with local market knowledge and professional service.',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
  },
  {
    icon: TrendingUp,
    title: 'Market Analysis',
    description: 'Comprehensive market analysis and pricing guidance to help you make informed property decisions.',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    iconBg: 'bg-emerald-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200',
  },
  {
    icon: Camera,
    title: 'Professional Marketing',
    description: 'Professional photography and effective marketing strategies to showcase your property to potential buyers.',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    iconBg: 'bg-purple-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
  },
  {
    icon: Globe,
    title: 'Wide Network',
    description: 'Extensive network of buyers, sellers, and industry professionals to help you achieve your property goals.',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    iconBg: 'bg-amber-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200',
  },
  {
    icon: Shield,
    title: 'Full Service Support',
    description: 'Complete support throughout your property journey, from initial consultation to final settlement.',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    iconBg: 'bg-red-500',
    hoverBg: 'hover:bg-gradient-to-br hover:from-red-100 hover:to-red-200',
  },
  {
    icon: Handshake,
    title: 'Personalized Service',
    description: 'Tailored approach to meet your specific needs and preferences in the property market.',
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
            Professional Real Estate Services
          </h2>
          <div className="flex justify-center">
            <p className="text-slate-600 font-light max-w-2xl text-center">
              Comprehensive property services designed to help you achieve your real estate goals
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
            Ready to get started with your property journey? Contact us today
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};
