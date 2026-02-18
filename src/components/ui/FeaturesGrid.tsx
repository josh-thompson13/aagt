'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  gradient: string;
}

export const FeaturesGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const features: Feature[] = [
    {
      icon: Clock,
      title: 'Same Day Approval',
      description:
        'Get your funding decision within hours, not weeks. Our streamlined process means faster access to capital.',
      benefits: ['Decision in 24 hours', 'No committee delays', 'Direct assessment'],
      color: 'green',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      icon: DollarSign,
      title: '$150K to $10M Range',
      description:
        'Flexible funding amounts to match your business needs, from expansion to major investments.',
      benefits: ['Flexible amounts', 'Competitive rates', 'Tailored terms'],
      color: 'teal',
      gradient: 'from-teal-400 to-cyan-600',
    },
    {
      icon: FileText,
      title: 'Minimal Documentation',
      description:
        'Simple application process with reduced paperwork. Focus on your business, not bureaucracy.',
      benefits: ['Streamlined process', 'Digital submissions', 'Quick verification'],
      color: 'primary',
      gradient: 'from-blue-400 to-indigo-600',
    },
    {
      icon: Zap,
      title: '4-Day Settlement',
      description:
        'From approval to funds in your account in just 4 business days. The fastest in the industry.',
      benefits: ['Rapid settlement', 'Direct transfers', 'No hidden delays'],
      color: 'gold',
      gradient: 'from-yellow-400 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description:
        'Trusted Australian lender with full compliance. Your business information is protected with bank-level security.',
      benefits: ['Trusted partner', 'Data encryption', 'Privacy protected'],
      color: 'green',
      gradient: 'from-green-400 to-teal-600',
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description:
        'Personal relationship manager assigned to your account. Human support when you need it.',
      benefits: ['Personal manager', '24/7 support', 'Local expertise'],
      color: 'primary',
      gradient: 'from-purple-400 to-blue-600',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: 45,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        border: 'border-green-200',
        text: 'text-green-700',
        hover: 'hover:border-green-400',
        glow: 'group-hover:shadow-green-200',
      },
      teal: {
        bg: 'bg-teal-50',
        icon: 'bg-teal-100 text-teal-600',
        border: 'border-teal-200',
        text: 'text-teal-700',
        hover: 'hover:border-teal-400',
        glow: 'group-hover:shadow-teal-200',
      },
      primary: {
        bg: 'bg-primary-50',
        icon: 'bg-primary-100 text-primary-600',
        border: 'border-primary-200',
        text: 'text-primary-700',
        hover: 'hover:border-primary-400',
        glow: 'group-hover:shadow-primary-200',
      },
      gold: {
        bg: 'bg-gold-50',
        icon: 'bg-gold-100 text-gold-600',
        border: 'border-gold-200',
        text: 'text-gold-700',
        hover: 'hover:border-gold-400',
        glow: 'group-hover:shadow-gold-200',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.teal;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-teal-100 rounded-full mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(8, 145, 178, 0.2)' }}
          >
            <Briefcase className="h-5 w-5 text-teal-700 mr-2" />
            <span className="text-teal-800 font-semibold text-sm uppercase tracking-wider">
              Why Choose AAGT
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-primary-900 via-teal-700 to-primary-900 bg-clip-text text-transparent">
              Streamlined Funding
            </span>
            <br />
            <span className="text-gray-800">Built for Business</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience the difference of working with a direct lender. Our innovative approach
            combines speed, flexibility, and personal service to deliver funding solutions that work
            for your business.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ perspective: '1000px' }}
        >
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <motion.div
                key={index}
                className={`group relative bg-white rounded-3xl border-2 ${colors.border} ${colors.hover} p-8 transition-all duration-500 overflow-hidden cursor-pointer`}
                variants={itemVariants}
                whileHover={{
                  y: -20,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                  },
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl transform translate-z-[-10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  style={{ transform: 'translateZ(-5px)' }}
                />

                {/* Floating icon with 3D effect */}
                <motion.div
                  className={`relative z-10 inline-flex p-4 ${colors.icon} rounded-2xl mb-6`}
                  whileHover={{
                    y: -5,
                    rotateY: 15,
                    rotateX: -10,
                    transition: { duration: 0.3 },
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <feature.icon className="h-8 w-8 transform transition-transform duration-300 group-hover:scale-110" />

                  {/* Icon shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent rounded-2xl transform translate-y-1 translate-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Content with depth */}
                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-4"
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  >
                    {feature.title}
                  </motion.h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                  {/* Benefits list with staggered animation */}
                  <motion.ul
                    className="space-y-3 mb-6"
                    initial="hidden"
                    whileHover="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefitIndex}
                        className="flex items-center space-x-3"
                        variants={{
                          hidden: { x: -10, opacity: 0.7 },
                          visible: {
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.3 },
                          },
                        }}
                      >
                        <motion.div
                          className={`p-1 ${colors.icon} rounded-full`}
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle2 className="h-3 w-3" />
                        </motion.div>
                        <span className="text-sm font-medium text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Learn more link with arrow animation */}
                  <motion.div
                    className={`inline-flex items-center ${colors.text} font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn more</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Decorative 3D elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-150" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:rotate-45" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-900 via-primary-800 to-teal-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300"
            whileHover={{
              y: -3,
              scale: 1.05,
              boxShadow: '0 25px 50px rgba(10, 37, 64, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Application</span>
            <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
