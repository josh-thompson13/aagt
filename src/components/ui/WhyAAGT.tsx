'use client';

import { motion } from 'framer-motion';
import { Banknote, Clock, FileText, Settings } from 'lucide-react';

export const WhyAAGT = () => {
  const features = [
    {
      icon: Banknote,
      title: 'Direct Lender',
      description: 'We fund with our own capital',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-green-100 hover:to-green-200',
    },
    {
      icon: Clock,
      title: '4-Day Settlement',
      description: 'From approval to funds',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
    },
    {
      icon: FileText,
      title: 'Simple Process',
      description: 'No committees or complex requirements',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      iconBg: 'bg-amber-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200',
    },
    {
      icon: Settings,
      title: 'Flexible Terms',
      description: 'Tailored to your needs',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
    },
  ];

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
  );
};
