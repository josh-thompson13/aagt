import { ArrowRight, Award, Heart, Mail, Phone, Users, DollarSign, Clock } from 'lucide-react';
import { AppConfig } from '@/utils/AppConfig';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About AAGT Private Loans | Direct Lending Specialists',
    description:
      'Discover how AAGT Private Loans is transforming business funding with direct lending, same day approvals, and competitive rates. Meet our experienced lending team.',
    keywords:
      'AAGT private loans about, direct business lender, private lending specialists, alternative business funding, lending team experience, business loan experts',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au/about',
    },
    openGraph: {
      title: 'About AAGT Private Loans | Direct Lending Specialists',
      description:
        'Discover how AAGT Private Loans is transforming business funding with direct lending and competitive rates.',
      url: 'https://aagtprivateloans.com.au/about',
      siteName: 'AAGT Private Loans',
      images: [
        {
          url: 'https://aagtprivateloans.com.au/og-about.jpg',
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
      images: ['https://aagtprivateloans.com.au/twitter-about.jpg'],
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
    url: 'https://aagtprivateloans.com.au',
    logo: 'https://aagtprivateloans.com.au/images/aagt_logo_no_background.png',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                About AAGT Private Loans
              </h1>
              <div className="flex justify-center mt-4 mb-4">
                <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal max-w-3xl leading-relaxed text-center">
                  Direct private lending specialists transforming business funding with same day
                  approvals, competitive rates, and straightforward processes
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#story"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 transition duration-150"
                >
                  Our Story
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Mission */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-primary-700" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Mission</h2>
                </div>
                <p className="text-base text-slate-200 leading-relaxed">
                  {AppConfig.mission}. We believe business funding should be accessible,
                  transparent, and focused on helping entrepreneurs and investors achieve their
                  goals without unnecessary complexity.
                </p>
              </div>

              {/* Vision */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary-700" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Vision</h2>
                </div>
                <p className="text-base text-slate-200 leading-relaxed">
                  To become Australia's most trusted private lending partner, known for our
                  integrity, speed, and commitment to putting our clients' business success first.
                  We envision a future where every funding need is met with professional service and
                  competitive terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose AAGT Private Loans
              </h2>
              <div className="flex justify-center">
                <p className="text-lg md:text-xl text-slate-600 font-normal max-w-3xl leading-relaxed text-center">
                  The expertise and values that make AAGT Private Loans different from traditional
                  lenders
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: 'Direct Funding',
                  description:
                    'We lend our own funds, enabling faster decisions and flexible solutions',
                  bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
                  iconBg: 'bg-green-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-green-100 hover:to-green-200',
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: 'Same Day Approval',
                  description: 'Quick decisions when you need them most, with 4-day settlement',
                  bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
                  iconBg: 'bg-blue-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200',
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: 'Proven Experience',
                  description: 'Track record of successful funding for Australian businesses',
                  bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
                  iconBg: 'bg-amber-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200',
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: 'Personal Service',
                  description: 'Dedicated lending specialists who understand your business needs',
                  bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
                  iconBg: 'bg-purple-500',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 border border-gray-200 transition-all duration-300 group rounded-xl ${feature.bgColor} ${feature.hoverBg} hover:shadow-lg hover:scale-105 text-center bg-white shadow-sm`}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-4 ${feature.iconBg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="text-white transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-medium mb-3 text-lg">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-12 rounded-xl border border-slate-600 bg-primary-800">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="flex justify-center">
                  <p className="text-slate-200 font-light max-w-2xl text-center">
                    Common questions about AAGT Private Loans and our business funding services
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
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
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-600 pb-8 mb-8 last:border-b-0 last:mb-0"
                  >
                    <h3 className="font-medium text-white mb-4 text-lg">{faq.question}</h3>
                    <p className="text-slate-200 leading-relaxed">{faq.answer}</p>
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
              Ready to Secure Your Business Funding?
            </h2>
            <div className="flex justify-center">
              <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal max-w-2xl leading-relaxed text-center">
                Join thousands of Australian business owners who've chosen AAGT Private Loans for
                their funding needs. Experience professional lending with competitive terms.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 transition duration-150"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition duration-150"
              >
                Contact Us
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Call us for a consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Get expert lending advice</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
