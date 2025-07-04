'use client';

import { motion } from 'framer-motion';
import { Banknote, Clock, FileText, Settings } from 'lucide-react';

export const WhyAAGT = () => {
  const features = [
    {
      icon: Banknote,
      title: 'Direct Lender',
      description: 'We fund with our own capital',
      color: 'primary',
    },
    {
      icon: Clock,
      title: '4-Day Settlement',
      description: 'From approval to funds',
      color: 'teal',
    },
    {
      icon: FileText,
      title: 'Simple Process',
      description: 'No committees or complex requirements',
      color: 'green',
    },
    {
      icon: Settings,
      title: 'Flexible Terms',
      description: 'Tailored to your needs',
      color: 'gold',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'bg-primary-100 text-primary-600',
        border: 'border-primary-200',
      },
      teal: {
        bg: 'bg-teal-50',
        icon: 'bg-teal-100 text-teal-600',
        border: 'border-teal-200',
      },
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        border: 'border-green-200',
      },
      gold: {
        bg: 'bg-gold-50',
        icon: 'bg-gold-100 text-gold-600',
        border: 'border-gold-200',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.teal;
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Why Choose AAGT?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make business funding simple, fast, and flexible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <motion.div
                key={index}
                className={`text-center p-8 ${colors.bg} rounded-3xl ${colors.border} border-2 hover:shadow-xl transition-all duration-300`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex p-4 ${colors.icon} rounded-2xl mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
