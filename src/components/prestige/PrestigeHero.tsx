'use client';

import { ArrowRight, CheckCircle2, Clock, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AppConfig } from '@/utils/AppConfig';

export const PrestigeHero = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [calculatorPreview, setCalculatorPreview] = useState({ monthlyPayment: 0, isVisible: false });
  const router = useRouter();

  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/apply?amount=${encodeURIComponent(loanAmount)}`);
  };

  const formatLoanAmount = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    const numberValue = parseInt(cleanValue) || 0;
    return numberValue.toLocaleString('en-AU');
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLoanAmount(e.target.value);
    setLoanAmount(formatted);
    
    // Show animated calculator preview
    const numericValue = parseInt(formatted.replace(/[^0-9]/g, '')) || 0;
    if (numericValue >= 150000) {
      const estimatedMonthly = (numericValue * 0.08) / 12; // Rough 8% annual rate estimate
      setCalculatorPreview({ 
        monthlyPayment: estimatedMonthly, 
        isVisible: true 
      });
    } else {
      setCalculatorPreview({ monthlyPayment: 0, isVisible: false });
    }
  };


  const features = [
    { icon: Clock, text: 'Same Day Approval' },
    { icon: DollarSign, text: '$150K to $5M Funding' },
    { icon: FileText, text: 'Minimal Documentation' },
    { icon: CheckCircle2, text: '4-Day Settlement' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
      style={{ y: yOffset, opacity }}
    >
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Subtle geometric pattern overlay for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-800/50 via-primary-900/80 to-primary-900" />
        {/* Bottom fade for content separation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/50 to-transparent" />
      </div>

      {/* Content Container with Professional Layout */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full">
          {/* Sleek Content Card with Glass Morphism */}
          <motion.div 
            className="bg-white/97 backdrop-blur-xl p-8 md:p-12 lg:p-20 rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-primary-50/30 rounded-3xl" />
            
            {/* Content Wrapper */}
            <motion.div 
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Professional Tagline */}
              <motion.div 
                className="mb-10 text-center"
                variants={itemVariants}
              >
                <motion.div 
                  className="inline-flex items-center px-6 py-3 bg-teal-100 rounded-full mb-6"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(8, 145, 178, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-teal-800 font-semibold text-sm uppercase tracking-wider">
                    {AppConfig.tagline}
                  </span>
                </motion.div>
              </motion.div>

              {/* Hero Heading with Refined Typography */}
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-900 mb-10 text-center leading-[1.1] tracking-tight"
                variants={itemVariants}
              >
                <motion.span 
                  className="bg-gradient-to-r from-primary-900 via-primary-800 to-teal-700 bg-clip-text text-transparent inline-block"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  Professional
                </motion.span>
                <br className="hidden md:block" />
                <motion.span 
                  className="text-primary-900 inline-block"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  Business Funding
                </motion.span>
                <br />
                <motion.span 
                  className="text-teal-700 text-5xl md:text-6xl lg:text-7xl inline-block"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  Solutions
                </motion.span>
              </motion.h1>

              {/* Enhanced Key Message */}
              <motion.p 
                className="text-xl md:text-3xl text-gray-700 mb-8 font-medium text-center max-w-5xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                {AppConfig.primaryMessage}
              </motion.p>

              {/* Professional Subheading */}
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-16 text-center max-w-4xl mx-auto leading-relaxed font-light"
                variants={itemVariants}
              >
                Direct funding from <span className="font-semibold text-teal-700">$150,000 to $5,000,000</span> with 
                <span className="font-semibold text-green-600"> same-day approval</span> and 
                <span className="font-semibold text-primary-700">4-day settlement</span>
              </motion.p>

              {/* Premium Features Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16"
                variants={itemVariants}
              >
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="group flex flex-col items-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/50 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden cursor-pointer"
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 2 + (index * 0.1), 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(8, 145, 178, 0.1)",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    {/* Icon container */}
                    <motion.div 
                      className="relative z-10 p-4 bg-teal-100 rounded-2xl group-hover:bg-teal-200 transition-colors duration-300 mb-4"
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <feature.icon className="h-8 w-8 text-teal-700 group-hover:text-teal-800 transition-colors duration-300" />
                    </motion.div>
                    
                    {/* Feature text */}
                    <span className="relative z-10 text-sm font-bold text-gray-800 text-center leading-tight group-hover:text-gray-900 transition-colors duration-300">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Premium Loan Calculator Form */}
              <motion.div 
                className="max-w-3xl mx-auto mb-12"
                variants={itemVariants}
              >
                <form onSubmit={handleApply} className="space-y-8">
                  <div className="text-center">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-primary-900 mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 2.5, duration: 0.6 }}
                    >
                      How much funding do you need?
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 2.7, duration: 0.6 }}
                    >
                      Get an instant quote for your business funding requirements
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    className="relative group"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.9, duration: 0.6 }}
                  >
                    {/* Enhanced input field */}
                    <div className="relative">
                      <motion.span 
                        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl font-bold z-10"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 3.1, duration: 0.4 }}
                      >
                        $
                      </motion.span>
                      <motion.input
                        type="text"
                        id="loanAmount"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        placeholder="Enter amount (e.g., 500,000)"
                        className="w-full pl-16 pr-8 py-6 text-2xl font-bold text-gray-900 bg-white border-3 border-gray-300 rounded-2xl focus:ring-6 focus:ring-teal-200/50 focus:border-teal-600 transition-all duration-500 shadow-lg hover:shadow-xl group-hover:border-teal-400 backdrop-blur-sm placeholder:text-gray-500"
                        whileFocus={{ scale: 1.02, boxShadow: "0 10px 30px rgba(8, 145, 178, 0.15)" }}
                      />
                      {/* Input highlight effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Animated Calculator Preview */}
                    <AnimatePresence>
                      {calculatorPreview.isVisible && (
                        <motion.div
                          className="mt-6 p-6 bg-gradient-to-br from-teal-50 to-primary-50 rounded-2xl border border-teal-200"
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className="p-2 bg-teal-100 rounded-lg"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                              >
                                <TrendingUp className="h-5 w-5 text-teal-700" />
                              </motion.div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Estimated Monthly Payment</p>
                                <motion.p 
                                  className="text-xl font-bold text-teal-700"
                                  key={calculatorPreview.monthlyPayment}
                                  initial={{ scale: 1.2, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  ${calculatorPreview.monthlyPayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
                                </motion.p>
                              </div>
                            </div>
                            <motion.button
                              type="button"
                              className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Get Full Quote
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.div 
                      className="flex justify-between items-center mt-4 px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.3, duration: 0.5 }}
                    >
                      <span className="text-sm text-gray-500">Min: $150,000</span>
                      <span className="text-sm font-semibold text-teal-700">Available from $150,000 to $5,000,000</span>
                      <span className="text-sm text-gray-500">Max: $5,000,000</span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Premium CTA Button */}
                  <motion.div 
                    className="relative group"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.6 }}
                  >
                    <motion.button
                      type="submit"
                      className="w-full relative overflow-hidden px-12 py-6 text-xl font-bold rounded-2xl text-white bg-gradient-to-r from-primary-900 via-primary-800 to-teal-700 hover:from-primary-800 hover:via-primary-700 hover:to-teal-600 focus:ring-6 focus:ring-primary-300 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-500 inline-flex items-center justify-center shadow-2xl group"
                      whileHover={{ 
                        y: -5, 
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(10, 37, 64, 0.3)",
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button background effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <span className="relative z-10">Apply for Funding</span>
                      <motion.div
                        className="relative z-10 ml-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Sleek Product Navigation */}
              <motion.div 
                className="text-center mt-16"
                variants={itemVariants}
              >
                <p className="text-gray-600 mb-8 text-lg font-medium">
                  Or explore our comprehensive loan products:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <a
                    href="/business-loans"
                    className="group px-8 py-4 bg-white border-2 border-teal-200 hover:border-teal-600 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white focus:ring-4 focus:ring-teal-200 focus:outline-none transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                  >
                    <span className="text-teal-700 group-hover:text-teal-800 font-semibold text-lg transition-colors duration-300">
                      Business Loans
                    </span>
                  </a>
                  <a
                    href="/investment-loans"
                    className="group px-8 py-4 bg-white border-2 border-teal-200 hover:border-teal-600 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white focus:ring-4 focus:ring-teal-200 focus:outline-none transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                  >
                    <span className="text-teal-700 group-hover:text-teal-800 font-semibold text-lg transition-colors duration-300">
                      Investment Loans
                    </span>
                  </a>
                  <a
                    href="/rates"
                    className="group px-8 py-4 bg-white border-2 border-teal-200 hover:border-teal-600 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white focus:ring-4 focus:ring-teal-200 focus:outline-none transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                  >
                    <span className="text-teal-700 group-hover:text-teal-800 font-semibold text-lg transition-colors duration-300">
                      Rates & Terms
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Premium Trust Signals */}
              <div className="mt-20 pt-12 border-t border-gray-200">
                <p className="text-2xl md:text-3xl font-bold text-primary-900 text-center leading-relaxed mb-10">
                  {AppConfig.mission}
                </p>
                
                {/* Professional Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="p-3 bg-green-100 rounded-xl mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">ASIC Regulated</h4>
                    <p className="text-sm text-gray-600 text-center">Fully licensed and regulated financial services</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
                    <div className="p-3 bg-teal-100 rounded-xl mb-4">
                      <CheckCircle2 className="h-8 w-8 text-teal-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Direct Lender</h4>
                    <p className="text-sm text-gray-600 text-center">No middlemen, faster decisions</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-200">
                    <div className="p-3 bg-primary-100 rounded-xl mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Australian Owned</h4>
                    <p className="text-sm text-gray-600 text-center">Local expertise, national reach</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.6 }}
      >
        <motion.div 
          className="cursor-pointer"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center hover:border-white/80 transition-colors duration-300">
            <motion.div 
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};