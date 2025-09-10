'use client';

import { motion } from 'framer-motion';
import { Banknote, Clock, FileText, Settings } from 'lucide-react';

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

     
    
    </>
  );
};
