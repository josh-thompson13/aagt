import { ArrowRight, Calculator, FileCheck, Heart, Key, Mail, MapPin, Phone, Search, Shield, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getAssetPath } from '@/utils/Helpers';

export function generateMetadata(): Metadata {

  return {
    title: 'Buy Property in Queensland | Expert Buyer Agents & Property Search',
    description: 'Find your perfect Queensland property with Realty Direct. Expert buyer agents, property search, market insights, and negotiation support. Brisbane, Gold Coast & more.',
    keywords: 'buy property Queensland, buyer agent Brisbane, Gold Coast property search, first home buyer, investment property, property market Queensland, house hunting, real estate buyers agent',
    alternates: {
      canonical: 'https://realtydirect.com.au/buying',
    },
    openGraph: {
      title: 'Buy Property in Queensland | Expert Buyer Agents & Property Search',
      description: 'Find your perfect Queensland property with Realty Direct. Expert buyer agents, property search, and market insights.',
      url: 'https://realtydirect.com.au/buying',
      siteName: 'Realty Direct',
      images: [
        {
          url: 'https://realtydirect.com.au/og-buying.jpg',
          width: 1200,
          height: 630,
          alt: 'Buy Property in Queensland with Realty Direct',
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Buy Property in Queensland | Expert Buyer Agents & Property Search',
      description: 'Find your perfect Queensland property with Realty Direct. Expert buyer agents and property search services.',
      images: ['https://realtydirect.com.au/twitter-buying.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Buying() {

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Property Buying Services Queensland',
    'description': 'Professional property buying services in Queensland including buyer representation, property search, and negotiation',
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Realty Direct',
      'url': 'https://realtydirect.com.au',
    },
    'areaServed': ['Queensland', 'Brisbane', 'Gold Coast', 'Sunshine Coast'],
    'serviceType': ['Buyer Agent', 'Property Search', 'Market Analysis', 'Negotiation Services'],
    'offers': {
      '@type': 'Offer',
      'description': 'Free buyer consultation and market briefing',
    },
  };

  const buyingProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Understand your needs, budget, and preferred locations with a comprehensive buyer briefing',
      icon: <Users className="w-8 h-8" />,
    },
    {
      step: 2,
      title: 'Property Search',
      description: 'Access to exclusive listings and off-market properties matching your criteria',
      icon: <Search className="w-8 h-8" />,
    },
    {
      step: 3,
      title: 'Market Analysis',
      description: 'Detailed property reports including market value, comparable sales, and growth potential',
      icon: <Calculator className="w-8 h-8" />,
    },
    {
      step: 4,
      title: 'Property Inspections',
      description: 'Professional guidance during inspections with expert insights on property condition and value',
      icon: <Shield className="w-8 h-8" />,
    },
    {
      step: 5,
      title: 'Negotiation & Purchase',
      description: 'Expert negotiation to secure the best price and terms, plus support through to settlement',
      icon: <Key className="w-8 h-8" />,
    },
  ];

  const buyerTypes = [
    {
      title: 'First Home Buyers',
      description: 'Navigate the Queensland property market with confidence. We\'ll guide you through grants, loans, and finding the perfect starter home.',
      icon: <Heart className="w-12 h-12" />,
      benefits: ['First home buyer grant guidance', 'Loan pre-approval assistance', 'Property inspection education', 'Ongoing support and advice'],
    },
    {
      title: 'Property Investors',
      description: 'Build your Queensland property portfolio with expert insights on growth areas, rental yields, and investment strategies.',
      icon: <Calculator className="w-12 h-12" />,
      benefits: ['Investment property analysis', 'Rental yield calculations', 'Growth area identification', 'Tax and depreciation advice'],
    },
    {
      title: 'Upgrading Families',
      description: 'Find your dream family home in Queensland\'s best suburbs. We understand what growing families need.',
      icon: <Users className="w-12 h-12" />,
      benefits: ['School catchment research', 'Family-friendly suburb analysis', 'Property size optimization', 'Future growth consideration'],
    },
  ];

  const faqs = [
    {
      question: 'What does a buyer\'s agent do?',
      answer: 'A buyer\'s agent represents your interests when purchasing property. We search for suitable properties, provide market analysis, attend inspections with you, negotiate on your behalf, and guide you through the entire buying process to ensure you get the best possible outcome.',
    },
    {
      question: 'How much does it cost to use a buyer\'s agent?',
      answer: 'Our buyer\'s agent fees are transparent and competitive. We offer different service packages to suit various budgets and needs. Contact us for a detailed discussion about our pricing structure and how we can help with your specific requirements.',
    },
    {
      question: 'Can you help first-time buyers?',
      answer: 'Absolutely! We specialize in helping first-time buyers navigate the Queensland property market. This includes guidance on first home buyer grants, loan pre-approval, property inspections, and understanding the buying process from start to finish.',
    },
    {
      question: 'Do you have access to off-market properties?',
      answer: 'Yes, through our extensive network of contacts and relationships with other agents, we often have access to properties before they hit the public market. This can give our clients a significant advantage in competitive markets.',
    },
    {
      question: 'Which areas of Queensland do you cover?',
      answer: 'We cover all major Queensland markets including Brisbane, Gold Coast, Sunshine Coast, and surrounding regions. Our team has detailed local knowledge across these areas to help you find the right property in the right location.',
    },
    {
      question: 'How long does it typically take to find and buy a property?',
      answer: 'The timeframe varies depending on your criteria, budget, and market conditions. Some clients find their perfect property within weeks, while others with very specific requirements may take several months. We work at your pace and keep you informed throughout the process.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={getAssetPath("/images/lisa-anna-_cglx9xLFqU-unsplash.jpg")}
              alt="Queensland property for buying"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
            <div className="max-w-4xl w-full text-center">
              {/* Main Content Card */}
              <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl">
                {/* Main Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                  Buy Your Dream Queensland Property
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal">
                  Expert buyer agents helping you find, evaluate, and secure the perfect property in Brisbane, Gold Coast, and beyond
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
                  >
                    Start Your Property Search
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="#process"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 transition duration-150"
                  >
                    Learn Our Process
                  </a>
                </div>

                {/* Quick Links */}
                <p className="text-slate-600 text-sm">
                  Or explore our other services:
                  <a
                    href="/selling"
                    className="mx-2 text-primary-600 hover:text-primary-700 underline"
                  >
                    Selling
                  </a>
                  •
                  <a
                    href="/renting"
                    className="mx-2 text-primary-600 hover:text-primary-700 underline"
                  >
                    Renting
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buyer Types Section */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
                We Help All Types of Buyers
              </h2>
              <div className="flex justify-center">
                <p className="text-lg md:text-xl text-slate-200 mb-10 font-normal max-w-2xl mx-auto text-center">
                  Professional buyer representation for every type of property purchase
                </p>
              </div>
            </div>

            {/* Buyer Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {buyerTypes.map((type, index) => {
                const bgColors = [
                  { bg: 'bg-gradient-to-br from-rose-50 to-rose-100', hover: 'hover:bg-gradient-to-br hover:from-rose-100 hover:to-rose-200', iconBg: 'bg-rose-500' },
                  { bg: 'bg-gradient-to-br from-blue-50 to-blue-100', hover: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200', iconBg: 'bg-blue-500' },
                  { bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100', hover: 'hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200', iconBg: 'bg-emerald-500' },
                ];
                const colorScheme = bgColors[index % bgColors.length]!;

                return (
                  <div
                    key={index}
                    className={`p-8 border border-gray-200 transition-all duration-300 group rounded-xl ${colorScheme.bg} ${colorScheme.hover} hover:shadow-lg hover:scale-105 h-full bg-white shadow-sm`}
                  >
                    {/* Icon */}
                    <div className="mb-6 text-center">
                      <div className={`inline-flex p-4 ${colorScheme.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                        <div className="text-white transition-colors duration-300">
                          {type.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-medium mb-3 text-center text-lg">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-center">
                      {type.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Buying Process */}
        <section id="process" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-12 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-center">
                  Our Proven Buying Process
                </h2>
                <div className="flex justify-center">
                  <p className="text-gray-600 font-light max-w-2xl text-center">
                    A structured approach to help you find and secure your perfect property
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {buyingProcess.map((step, index) => (
                  <div key={index} className="flex items-start gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold group-hover:bg-gray-800 transition-colors duration-300">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2 text-gray-900 text-lg">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
                Why Choose Realty Direct?
              </h2>
              <div className="flex justify-center">
                <p className="text-lg md:text-xl text-slate-200 mb-10 font-normal max-w-2xl mx-auto text-center">
                  Professional buyer representation with unmatched local expertise
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="w-8 h-8" />,
                  title: 'Exclusive Access',
                  description: 'First access to new listings and off-market properties through our extensive network of contacts',
                  bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
                  iconBg: 'bg-blue-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Expert Negotiation',
                  description: 'Professional negotiation skills to secure the best price and terms for your property purchase',
                  bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
                  iconBg: 'bg-emerald-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200',
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: 'Local Knowledge',
                  description: 'Deep understanding of Queensland markets, suburbs, and property values across the region',
                  bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
                  iconBg: 'bg-purple-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`p-8 border border-gray-200 transition-all duration-300 group rounded-xl ${benefit.bgColor} ${benefit.hoverBg} hover:shadow-lg hover:scale-105 text-center bg-white shadow-sm`}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-4 ${benefit.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                      <div className="text-white transition-colors duration-300">
                        {benefit.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-medium mb-3 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-12 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="flex justify-center">
                  <p className="text-gray-600 font-light max-w-2xl text-center">
                    Common questions about our buyer representation services
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <h3 className="font-medium text-gray-900 mb-4 text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Find Your Perfect Property?
            </h2>
            <div className="flex justify-center">
              <p className="text-lg md:text-xl text-gray-100 mb-10 font-normal max-w-2xl leading-relaxed text-center">
                Start your Queensland property search today with expert guidance from our experienced buyer's agents
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
              >
                Start Property Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 transition duration-150"
              >
                Learn More About Us
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Call us today for a consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Get expert property advice</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
