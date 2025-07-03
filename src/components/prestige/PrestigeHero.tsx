'use client';

import { ArrowRight, CheckCircle2, Clock, DollarSign, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AppConfig } from '@/utils/AppConfig';

export const PrestigeHero = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

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
  };

  // Timeout fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true);
        setImageError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [imageLoaded]);

  const features = [
    { icon: Clock, text: 'Same Day Approval' },
    { icon: DollarSign, text: '$150K to $5M Funding' },
    { icon: FileText, text: 'Minimal Documentation' },
    { icon: CheckCircle2, text: '4-Day Settlement' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Sydney Background Image with Professional Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/sydney.jpeg"
          alt="Sydney cityscape - Professional business environment"
          className={`w-full h-full object-cover object-center transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        {/* Professional gradient overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-900/75" />
        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        {/* Bottom fade for content separation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/50 to-transparent" />
      </div>

      {/* Elegant Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-700/30 border-t-teal-700 mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-teal-500/20 animate-pulse"></div>
            </div>
            <p className="text-white/90 text-lg font-medium">Loading your funding solutions...</p>
          </div>
        </div>
      )}

      {/* Professional Error State Fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-800/50 via-primary-900/80 to-primary-900"></div>
        </div>
      )}

      {/* Content Container with Professional Layout */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full">
          {/* Sleek Content Card with Glass Morphism */}
          <div className="bg-white/97 backdrop-blur-xl p-8 md:p-12 lg:p-20 rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-primary-50/30 rounded-3xl"></div>
            
            {/* Content Wrapper */}
            <div className="relative z-10">
              {/* Professional Tagline */}
              <div className="mb-10 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-teal-100 rounded-full mb-6">
                  <span className="text-teal-800 font-semibold text-sm uppercase tracking-wider">
                    {AppConfig.tagline}
                  </span>
                </div>
              </div>

              {/* Hero Heading with Refined Typography */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-900 mb-10 text-center leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-primary-900 via-primary-800 to-teal-700 bg-clip-text text-transparent">
                  Professional
                </span>
                <br className="hidden md:block" />
                <span className="text-primary-900">Business Funding</span>
                <br />
                <span className="text-teal-700 text-5xl md:text-6xl lg:text-7xl">Solutions</span>
              </h1>

              {/* Enhanced Key Message */}
              <p className="text-xl md:text-3xl text-gray-700 mb-8 font-medium text-center max-w-5xl mx-auto leading-relaxed">
                {AppConfig.primaryMessage}
              </p>

              {/* Professional Subheading */}
              <p className="text-lg md:text-xl text-gray-600 mb-16 text-center max-w-4xl mx-auto leading-relaxed font-light">
                Direct funding from <span className="font-semibold text-teal-700">$150,000 to $5,000,000</span> with 
                <span className="font-semibold text-green-600"> same-day approval</span> and 
                <span className="font-semibold text-primary-700">4-day settlement</span>
              </p>

              {/* Premium Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group flex flex-col items-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/50 hover:border-teal-300 hover:shadow-xl transition-all duration-500 hover:transform hover:-translate-y-2 relative overflow-hidden"
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Icon container */}
                    <div className="relative z-10 p-4 bg-teal-100 rounded-2xl group-hover:bg-teal-200 transition-colors duration-300 mb-4">
                      <feature.icon className="h-8 w-8 text-teal-700 group-hover:text-teal-800 transition-colors duration-300" />
                    </div>
                    
                    {/* Feature text */}
                    <span className="relative z-10 text-sm font-bold text-gray-800 text-center leading-tight group-hover:text-gray-900 transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Premium Loan Calculator Form */}
              <div className="max-w-3xl mx-auto mb-12">
                <form onSubmit={handleApply} className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                      How much funding do you need?
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Get an instant quote for your business funding requirements
                    </p>
                  </div>
                  
                  <div className="relative group">
                    {/* Enhanced input field */}
                    <div className="relative">
                      <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl font-bold z-10">
                        $
                      </span>
                      <input
                        type="text"
                        id="loanAmount"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        placeholder="Enter amount (e.g., 500,000)"
                        className="w-full pl-16 pr-8 py-6 text-2xl font-bold border-3 border-gray-300 rounded-2xl focus:ring-6 focus:ring-teal-200/50 focus:border-teal-600 transition-all duration-500 shadow-lg hover:shadow-xl bg-white group-hover:border-teal-400 backdrop-blur-sm"
                      />
                      {/* Input highlight effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 px-2">
                      <span className="text-sm text-gray-500">Min: $150,000</span>
                      <span className="text-sm font-semibold text-teal-700">Available from $150,000 to $5,000,000</span>
                      <span className="text-sm text-gray-500">Max: $5,000,000</span>
                    </div>
                  </div>
                  
                  {/* Premium CTA Button */}
                  <div className="relative group">
                    <button
                      type="submit"
                      className="w-full relative overflow-hidden px-12 py-6 text-xl font-bold rounded-2xl text-white bg-gradient-to-r from-primary-900 via-primary-800 to-teal-700 hover:from-primary-800 hover:via-primary-700 hover:to-teal-600 focus:ring-6 focus:ring-primary-300 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-500 inline-flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 active:translate-y-0 group"
                    >
                      {/* Button background effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <span className="relative z-10">Apply for Funding</span>
                      <ArrowRight className="relative z-10 ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                </form>
              </div>

              {/* Sleek Product Navigation */}
              <div className="text-center mt-16">
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
              </div>

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
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};