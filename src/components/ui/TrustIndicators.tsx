'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { Award, CheckCircle2, Clock, DollarSign, Shield, TrendingUp, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter = ({
  end,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2,
}: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeOutCubic = 1 - (1 - progress) ** 3;
      const currentCount = easeOutCubic * end;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const TrustIndicators = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const stats = [
    {
      icon: DollarSign,
      value: 500,
      suffix: 'M+',
      label: 'Loans Funded',
      description: 'Successfully funded to Australian businesses',
      color: 'green',
    },
    {
      icon: Users,
      value: 2500,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Businesses trust us for their funding needs',
      color: 'teal',
    },
    {
      icon: Clock,
      value: 24,
      label: 'Hour Approval',
      description: 'Average time from application to approval',
      color: 'primary',
    },
    {
      icon: Award,
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'Proven track record in private lending',
      color: 'gold',
    },
  ];

  const trustBadges = [
    {
      icon: Shield,
      title: 'ASIC Regulated',
      description: 'Fully licensed and regulated financial services',
      color: 'green',
    },
    {
      icon: CheckCircle2,
      title: 'Direct Lender',
      description: 'No middlemen, faster decisions',
      color: 'teal',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: '98% client satisfaction rate',
      color: 'primary',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
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
      },
      teal: {
        bg: 'bg-teal-50',
        icon: 'bg-teal-100 text-teal-600',
        border: 'border-teal-200',
        text: 'text-teal-700',
      },
      primary: {
        bg: 'bg-primary-50',
        icon: 'bg-primary-100 text-primary-600',
        border: 'border-primary-200',
        text: 'text-primary-700',
      },
      gold: {
        bg: 'bg-gold-50',
        icon: 'bg-gold-100 text-gold-600',
        border: 'border-gold-200',
        text: 'text-gold-700',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.teal;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Trusted by Thousands of
            <span className="bg-gradient-to-r from-teal-700 to-primary-700 bg-clip-text text-transparent block">
              Australian Businesses
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Our track record speaks for itself. Join thousands of successful businesses who've
            achieved their goals with our funding solutions.
          </motion.p>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <motion.div
                key={index}
                className={`group relative p-8 ${colors.bg} rounded-3xl ${colors.border} border-2 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer`}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <motion.div
                  className={`relative z-10 inline-flex p-4 ${colors.icon} rounded-2xl mb-6`}
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <stat.icon className="h-8 w-8" />
                </motion.div>

                {/* Counter */}
                <div className="relative z-10">
                  <motion.div
                    className={`text-4xl md:text-5xl font-bold ${colors.text} mb-2`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    {isInView && (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                    )}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {trustBadges.map((badge, index) => {
            const colors = getColorClasses(badge.color);
            return (
              <motion.div
                key={index}
                className={`group flex flex-col items-center p-8 bg-white rounded-3xl border-2 ${colors.border} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Background effect */}
                <div
                  className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Icon */}
                <motion.div
                  className={`relative z-10 p-4 ${colors.icon} rounded-2xl mb-6`}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  <badge.icon className="h-8 w-8" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{badge.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{badge.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
