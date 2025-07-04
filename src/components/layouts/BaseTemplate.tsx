'use client';

import { AppConfig } from '@/utils/AppConfig';
import { getAssetPath } from '@/utils/Helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/ui/PageTransition';

export const BaseTemplate = (props: {
  navItems?: React.ReactNode;
  mobileNavItems?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen text-gray-800 antialiased">
      <motion.header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100'
            : 'bg-white shadow-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main navigation bar */}
          <div className="flex justify-between items-center h-16 sm:h-20">
            <motion.div
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src={getAssetPath('/images/aagt_logo_no_background.png')}
                  alt="AAGT Private Loans Logo"
                  width={180}
                  height={60}
                  className={`w-auto transition-all duration-300 ${
                    isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12'
                  }`}
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {props.navItems}
            </nav>

            {/* Apply for Loan CTA Button */}
            <motion.div
              className="hidden sm:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="/apply"
                className="bg-primary-900 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Apply Now
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                type="button"
                className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-500 hover:text-teal-700 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Open main menu</span>
                <motion.svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </motion.svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <motion.div
                  className="px-4 pt-4 pb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  {/* Simplified mobile navigation */}
                  <div className="space-y-2 mb-6">{props.mobileNavItems || props.navItems}</div>

                  {/* Large, prominent Apply button */}
                  <div className="space-y-3">
                    <Link
                      href="/apply"
                      className="block w-full bg-primary-900 text-white text-center py-5 px-6 rounded-xl text-xl font-bold hover:bg-primary-800 transition-colors duration-200 shadow-lg"
                    >
                      Apply for Loan
                    </Link>
                    <Link
                      href="/"
                      className="block w-full bg-gray-100 text-gray-700 text-center py-4 px-6 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                    >
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <main>
        <PageTransition>{props.children}</PageTransition>
      </main>

      <motion.footer
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              className="md:col-span-2"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <Image
                  src={getAssetPath('/images/aagt_logo_no_background.png')}
                  alt="AAGT Private Loans Logo"
                  width={160}
                  height={53}
                  className="h-10 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{AppConfig.name}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">{AppConfig.description}</p>
              <div className="flex space-x-4">
                <motion.div
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: '#0891B2' }}
                  whileTap={{ scale: 0.95 }}
                >
                  ASIC Regulated
                </motion.div>
                <motion.div
                  className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: '#1A4B73' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Direct Lender
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Loan Products</h3>
              <ul className="space-y-3">
                {[
                  { href: '/business-loans', label: 'Business Loans' },
                  { href: '/investment-loans', label: 'Investment Loans' },
                  { href: '/about', label: 'About Us' },
                  { href: '/apply', label: 'Apply Now' },
                ].map((link) => (
                  <motion.li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors duration-200 inline-flex items-center group"
                    >
                      <motion.span
                        className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Get Started Today</h3>
              <div className="space-y-4 mb-6">
                <p className="text-gray-300">
                  <span className="font-medium text-white">Email:</span>
                  <br />
                  {AppConfig.email}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-white">Response Time:</span>
                  <br />
                  Within 4 business hours
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/apply"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                  <motion.svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-700"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {AppConfig.name}. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/compliance"
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                >
                  Compliance
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};
