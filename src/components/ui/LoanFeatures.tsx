'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { DollarSign, Calendar, Percent, Building2, Zap, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

interface LoanFeature {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  description: string;
  highlight?: boolean;
}

export const LoanFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const features: LoanFeature[] = [
    {
      icon: DollarSign,
      title: 'Loan Amounts',
      value: '$150,000 - $5,000,000',
      description: 'Flexible funding to match your business needs',
      highlight: true,
    },
    {
      icon: Calendar,
      title: 'Loan Terms',
      value: '18-24 months',
      description: 'Short to medium term solutions available',
    },
    {
      icon: Percent,
      title: 'Interest Options',
      value: 'Interest Only Available',
      description: 'Reduce your monthly commitments',
    },
    {
      icon: Building2,
      title: 'LVR Ratios',
      value: 'Up to 80% LVR',
      description: '70% for second mortgages',
    },
    {
      icon: Zap,
      title: 'Direct Funding',
      value: 'No Committees',
      description: 'Fast decisions from a direct lender',
      highlight: true,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-teal-100 rounded-full mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <CheckCircle2 className="h-5 w-5 text-teal-700 mr-2" />
            <span className="text-teal-800 font-semibold text-sm uppercase tracking-wider">
              Loan Features
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-900 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Flexible Funding Solutions
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Tailored loan products designed for Australian businesses and investors
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-2xl ${
                feature.highlight
                  ? 'border-2 border-teal-500 shadow-xl'
                  : 'border border-gray-200 shadow-lg'
              } p-6 hover:shadow-2xl transition-all duration-300 group`}
              variants={itemVariants}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {/* Highlight badge */}
              {feature.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Featured
                  </span>
                </div>
              )}

              {/* Icon */}
              <motion.div
                className={`inline-flex p-3 ${
                  feature.highlight
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-primary-100 text-primary-600'
                } rounded-xl mb-4`}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-6 w-6" />
              </motion.div>

              {/* Content */}
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
                {feature.title}
              </h3>

              <p className="text-xl font-bold text-primary-900 mb-2">{feature.value}</p>

              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center space-x-2 text-sm text-gray-600 bg-gray-100 rounded-full px-6 py-3">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>All loans subject to approval and lending criteria</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
