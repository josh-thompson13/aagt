import { LazyImage } from '@/components/common/LazyImage';
import { AppConfig } from '@/utils/AppConfig';
import { getAssetPath } from '@/utils/Helpers';
import { ArrowRight, Award, Clock, DollarSign, Heart, Mail, Phone, Shield, Target } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About AAGT Private Loans | Direct Lending Specialists',
    description:
      'Discover how AAGT Private Loans is transforming business funding with direct lending, same day approvals, and competitive rates. Meet our experienced lending team.',
    keywords:
      'AAGT private loans about, direct business lender, private lending specialists, alternative business funding, lending team experience, business loan experts',
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      title: 'About AAGT Private Loans | Direct Lending Specialists',
      description:
        'Discover how AAGT Private Loans is transforming business funding with direct lending and competitive rates.',
      url: '/about',
      siteName: 'AAGT Private Loans',
      images: [
        {
          url: '/og-about.jpg',
          width: 1200,
          height: 630,
          alt: 'AAGT Private Loans Team - Direct Lending Specialists',
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About AAGT Private Loans | Direct Lending Specialists',
      description:
        'Discover how AAGT Private Loans is transforming business funding with direct lending.',
      images: ['/twitter-about.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function About() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AAGT Private Loans',
    description:
      'Direct private lending company providing fast business funding with same day approval and competitive rates',
    url: '/',
    logo: getAssetPath('/images/aagt_logo_no_background.png'),
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    areaServed: 'Australia',
    serviceType: ['Business Loans', 'Investment Loans', 'Private Lending', 'Second Mortgages'],
    foundingDate: '2020',
    slogan: AppConfig.mission,
  };

  const keyFeatures = [
    { icon: Clock, text: 'Same Day Decisions', color: 'bg-blue-500' },
    { icon: DollarSign, text: 'Direct Funding', color: 'bg-green-500' },
    { icon: Shield, text: 'Proven Track Record', color: 'bg-purple-500' },
    { icon: Target, text: 'Personal Service', color: 'bg-orange-500' },
  ];


  const faqs = [
    {
      question: 'What makes AAGT different from banks and other lenders?',
      answer:
        "We're a direct lender using our own funds, which means no committee delays, faster approvals, and more flexible terms. We focus on your business potential rather than just credit scores.",
    },
    {
      question: 'What loan amounts do you offer?',
      answer:
        'We provide business funding from $150,000 to $5,000,000 for any worthwhile business purpose including expansion, equipment, working capital, and investment opportunities.',
    },
    {
      question: 'How quickly can I get approved and receive funds?',
      answer:
        'We offer same day approval for qualified applicants, with funds typically available within 4 working days of approval. Our streamlined process eliminates unnecessary delays.',
    },
    {
      question: 'What documentation do you require?',
      answer:
        'We require minimal documentation compared to traditional lenders. Our streamlined process focuses on the essentials needed to assess your funding request quickly and efficiently.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="text-center lg:text-left">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
                About AAGT Private Loans
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transforming
                <span className="block text-primary-700">Business Funding</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Direct private lending specialists revolutionizing business funding with same day approvals, competitive rates, and straightforward processes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contact Our Team
                </Link>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 ${feature.color} rounded-lg`}>
                      <feature.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={getAssetPath("/images/brooke-cagle-JBwcenOuRCg-unsplash.jpg")}
                  alt="AAGT Private Loans team and professional service"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Fast</div>
                  <div className="text-sm text-gray-600">Funding</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">40+</div>
                  <div className="text-xs text-gray-600">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <LazyImage
            src={getAssetPath("/images/kevin-matos-Nl_FMFpXo2g-unsplash.jpg")}
            alt="Professional mission and vision background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            rootMargin="100px"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
              Our Purpose & Vision
            </h2>
            <div className="flex justify-center">
              <p className="text-primary-100 font-light max-w-2xl text-center">
                The values and vision that drive everything we do at AAGT Private Loans
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-blue-500 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {AppConfig.mission}. We believe business funding should be accessible, transparent, and focused on helping entrepreneurs and investors achieve their goals without unnecessary complexity.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-emerald-500 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To revolutionize private lending by eliminating the friction between ambition and capital. We're building a future where smart businesses get funded on merit, not bureaucracy - where a great opportunity doesn't have to wait weeks for committee approval.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <LazyImage
            src={getAssetPath("/images/mario-gogh-VBLHICVh-lI-unsplash.jpg")}
            alt="FAQ and support background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            rootMargin="100px"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
              Frequently Asked Questions
            </h2>
            <div className="flex justify-center">
              <p className="text-primary-100 font-light max-w-2xl text-center">
                Common questions about AAGT Private Loans and our business funding services
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Secure Your Business Funding?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of Australian business owners who've chosen AAGT Private Loans for their funding needs. Experience professional lending with competitive terms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact Our Team
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Call for expert consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Get personalized lending advice</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}