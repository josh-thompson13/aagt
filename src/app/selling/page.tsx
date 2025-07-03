import { StructuredData } from '@/components/common/StructuredData';
import { ArrowRight, Camera, CheckCircle, DollarSign, FileText, Home, TrendingUp, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getAssetPath } from '@/utils/Helpers';

export function generateMetadata(): Metadata {

  return {
    title: 'Sell Your Property in Queensland | Expert Real Estate Services',
    description: 'Get the best price for your Queensland property with Realty Direct. Expert property valuations, professional marketing, and transparent pricing. Free appraisal available.',
    keywords: 'sell property Queensland, real estate agents Brisbane, Gold Coast property sales, property appraisal, house selling tips, property marketing Queensland, real estate commission, sell house fast',
    alternates: {
      canonical: 'https://realtydirect.com.au/selling',
    },
    openGraph: {
      title: 'Sell Your Property in Queensland | Expert Real Estate Services',
      description: 'Get the best price for your Queensland property with Realty Direct. Expert valuations, professional marketing, and transparent pricing.',
      url: 'https://realtydirect.com.au/selling',
      siteName: 'Realty Direct',
      images: [
        {
          url: 'https://realtydirect.com.au/og-selling.jpg',
          width: 1200,
          height: 630,
          alt: 'Sell Your Property with Realty Direct',
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sell Your Property in Queensland | Expert Real Estate Services',
      description: 'Get the best price for your Queensland property with Realty Direct. Expert valuations and professional marketing.',
      images: ['https://realtydirect.com.au/twitter-selling.jpg'],
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

export default function Selling() {

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Property Selling Services Queensland',
    'description': 'Professional property selling services in Queensland including valuations, marketing, and sales management',
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Realty Direct',
      'url': 'https://realtydirect.com.au',
    },
    'areaServed': ['Queensland', 'Brisbane', 'Gold Coast', 'Sunshine Coast'],
    'serviceType': ['Property Valuation', 'Property Marketing', 'Sales Negotiation', 'Property Management'],
    'offers': {
      '@type': 'Offer',
      'description': 'Free property appraisal and market analysis',
    },
  };

  const sellingProcess = [
    {
      step: 1,
      title: 'Free Property Appraisal',
      description: 'Get an accurate market valuation of your property with our comprehensive appraisal service',
      icon: <Home className="w-8 h-8" />,
    },
    {
      step: 2,
      title: 'Professional Photography',
      description: 'Stunning photography and virtual tours to showcase your property at its best',
      icon: <Camera className="w-8 h-8" />,
    },
    {
      step: 3,
      title: 'Marketing Strategy',
      description: 'Multi-channel marketing including online portals, social media, and print advertising',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      step: 4,
      title: 'Buyer Management',
      description: 'Professional handling of inspections, negotiations, and all buyer communications',
      icon: <Users className="w-8 h-8" />,
    },
    {
      step: 5,
      title: 'Settlement Support',
      description: 'Complete support through to settlement with all legal and administrative requirements',
      icon: <FileText className="w-8 h-8" />,
    },
  ];

  const faqs = [
    {
      question: 'How much does it cost to sell my property with Realty Direct?',
      answer: 'Our transparent fee structure offers competitive rates with no hidden costs. We provide upfront pricing so you know exactly what you\'ll pay. Contact us for a detailed quote based on your specific property and requirements.',
    },
    {
      question: 'How long does it typically take to sell a property in Queensland?',
      answer: 'The average time to sell varies by location and market conditions. In Queensland\'s major markets like Brisbane and Gold Coast, properties typically sell within 4-8 weeks with proper pricing and marketing. We\'ll provide a realistic timeline based on your specific property and current market conditions.',
    },
    {
      question: 'Do you provide a free property appraisal?',
      answer: 'Yes! We offer complimentary property appraisals including a comprehensive market analysis. Our experienced agents will assess your property\'s value based on recent sales, market trends, and property features.',
    },
    {
      question: 'What marketing is included in your selling service?',
      answer: 'Our comprehensive marketing package includes professional photography, online listings on major portals (realestate.com.au, Domain), social media promotion, email marketing to our database, and print advertising where appropriate. We tailor the marketing strategy to your property and target market.',
    },
    {
      question: 'Can you help prepare my property for sale?',
      answer: 'Absolutely! We provide guidance on property presentation, staging advice, and can recommend trusted tradespeople for any repairs or improvements that could increase your property\'s value and appeal to buyers.',
    },
    {
      question: 'What areas of Queensland do you cover?',
      answer: 'We service all major Queensland markets including Brisbane, Gold Coast, Sunshine Coast, and surrounding areas. Our team has extensive local knowledge across these regions to ensure the best possible outcome for your property sale.',
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={getAssetPath("/images/lisa-anna-_cglx9xLFqU-unsplash.jpg")}
              alt="Sell Your Queensland Property"
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
                  Sell Your Queensland Property
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal">
                  Get the best price with expert marketing, transparent pricing, and professional service from Queensland's most trusted independent agents
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
                  >
                    Get Free Appraisal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 transition duration-150"
                  >
                    Learn More About Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-16 flex flex-col items-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 text-center">
                Why Choose Realty Direct to Sell Your Property?
              </h2>
              <p className="text-slate-200 font-normal max-w-3xl text-center leading-relaxed">
                Our expert team combines proven marketing strategies with transparent communication to achieve the best possible price for your Queensland property.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <DollarSign className="w-10 h-10" />,
                  title: 'Maximum Sale Price',
                  description: 'Our expert pricing strategies and proven marketing methods consistently achieve top dollar for our clients\' properties',
                  bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
                  iconBg: 'bg-emerald-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200',
                },
                {
                  icon: <TrendingUp className="w-10 h-10" />,
                  title: 'Professional Marketing',
                  description: 'Comprehensive marketing campaigns across all major platforms to ensure maximum exposure for your property',
                  bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
                  iconBg: 'bg-blue-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
                },
                {
                  icon: <CheckCircle className="w-10 h-10" />,
                  title: 'Transparent Process',
                  description: 'Clear communication, regular updates, and transparent pricing with no hidden fees or surprises',
                  bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
                  iconBg: 'bg-purple-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`p-8 border border-gray-200 transition-all duration-300 group rounded-xl ${benefit.bgColor} ${benefit.hoverBg} hover:shadow-lg hover:scale-105 text-center bg-white shadow-sm`}
                >
                  <div className="mb-6">
                    <div className={`inline-flex p-4 ${benefit.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                      <div className="text-white transition-colors duration-300">
                        {benefit.icon}
                      </div>
                    </div>
                  </div>
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

        {/* Selling Process Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-12 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-center">
                  Our 5-Step Selling Process
                </h2>
                <div className="flex justify-center">
                  <p className="text-gray-600 font-light max-w-2xl text-center">
                    A proven approach to getting you the best price for your property
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {sellingProcess.map((step, index) => (
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

        {/* FAQ Section */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-12 rounded-xl border border-slate-600 bg-primary-800">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
                  Frequently Asked Questions About Selling
                </h2>
                <div className="flex justify-center">
                  <p className="text-slate-200 font-light max-w-2xl text-center">
                    Common questions about our property selling services
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-slate-600 pb-8 mb-8 last:border-b-0 last:mb-0">
                    <h3 className="font-medium text-white mb-4 text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-slate-200 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Ready to Sell Your Property?
            </h2>
            <div className="flex justify-center">
              <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal max-w-2xl leading-relaxed text-center">
                Get started with a free property appraisal and discover how much your Queensland property is worth in today's market.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
              >
                Book Free Appraisal
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-slate-900 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition duration-150"
              >
                Learn More About Us
              </a>
            </div>

            {/* Motto */}
            <div className="mt-14 pt-8 border-t border-slate-200">
              <p className="text-slate-700 italic font-light text-lg">
                "Direct communication, exceptional results"
              </p>
              <p className="text-slate-500 mt-2 text-sm">
                Experience the difference with Realty Direct
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
