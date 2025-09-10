'use client';

import { motion } from 'framer-motion';
import { Banknote, Clock, FileText, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../../utils/Helpers';

export const WhyAAGT = () => {
  const features = [
    {
      icon: Banknote,
      title: 'Direct Funding',
      description: 'We lend our own funds, enabling faster decisions and flexible solutions tailored to your business needs.',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-green-100 hover:to-green-200',
    },
    {
      icon: Clock,
      title: 'Same Day Approval',
      description: 'Quick decisions when you need them most, with settlement as quick as 4 working days.',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
    },
    {
      icon: FileText,
      title: 'Proven Experience',
      description: 'Extensive track record of successful funding for Australian businesses across diverse industries.',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      iconBg: 'bg-amber-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200',
    },
    {
      icon: Settings,
      title: 'Personal Service',
      description: 'Dedicated lending specialists who understand your business and provide personalized solutions.',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
    },
  ];

  return (
    <>
      {/* Why Choose AAGT Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose AAGT Private Loans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The expertise and values that make AAGT Private Loans different from traditional lenders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-8 transition-all duration-300 group rounded-xl ${feature.bgColor} ${feature.hoverBg} hover:shadow-lg hover:scale-105 text-center bg-white shadow-sm`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex p-4 ${feature.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                {/* Content */}
                <h3 className="font-medium mb-3 text-lg">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Success Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Success Built on
                <span className="block text-primary-700">Strong Partnerships</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Every business relationship we build is founded on trust, transparency, and mutual success. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Learn About Us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start a Conversation
                </Link>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getAssetPath("/images/matteo-vistocco-Dph00R2SwFo-unsplash.jpg")}
                  alt="Successful business partnership and collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">40+</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Business Environment Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="order-2 lg:order-1 relative"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getAssetPath("/images/mario-gogh-VBLHICVh-lI-unsplash.jpg")}
                  alt="Modern Australian business environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">High</div>
                  <div className="text-xs text-gray-600">LVR's</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">Low</div>
                  <div className="text-xs text-gray-600">Rates</div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Modern
                <span className="block text-primary-700">Australian Business</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                From innovative startups to established enterprises, we understand the unique challenges 
                facing Australian businesses today. Our modern approach to lending reflects the dynamic 
                nature of today's business environment.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Technology-driven assessment process</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Industry-agnostic funding solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Scalable loan amounts for growth</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/business-loans"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Business Loans
                </Link>
                <Link
                  href="/investment-loans"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Investment Loans
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
