import { LazyImage } from '@/components/common/LazyImage';
import ContactForm from '@/components/forms/ContactForm';
import { getAbsoluteUrl } from '@/utils/getBaseUrl';
import { getAssetPath } from '@/utils/Helpers';
import { ArrowRight, CheckCircle, Clock, Mail, MessageCircle, Phone, Shield, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Contact Us | AAGT Private Loans',
    description:
      'Contact AAGT Private Loans for business funding inquiries. Get same day approval for loans from $150,000 to $5,000,000. Speak to our lending specialists today.',
    keywords:
      'contact AAGT private loans, business loan contact, private lending inquiry, loan specialist contact, business funding help',
    alternates: {
      canonical: '/contact',
    },
    openGraph: {
      title: 'Contact Us | AAGT Private Loans',
      description:
        'Contact AAGT Private Loans for business funding inquiries and expert lending advice.',
      url: '/contact',
      siteName: 'AAGT Private Loans',
      images: [
        {
          url: getAbsoluteUrl('/og-contact.jpg'),
          width: 1200,
          height: 630,
          alt: 'Contact AAGT Private Loans',
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us | AAGT Private Loans',
      description: 'Contact AAGT Private Loans for business funding and lending support.',
      images: [getAbsoluteUrl('/og-contact.jpg')],
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

const contactInfo = {
  email: 'aagtpvtloans@gmail.com',
  phone: '+61 461 534 088',
  hours: 'Mon-Fri 9AM-6PM',
};

export default function Contact() {
  const keyFeatures = [
    { icon: Zap, text: 'Same Day Response', color: 'bg-blue-500' },
    { icon: Users, text: 'Expert Team', color: 'bg-green-500' },
    { icon: Shield, text: 'Confidential Advice', color: 'bg-purple-500' },
    { icon: MessageCircle, text: 'Multiple Channels', color: 'bg-orange-500' },
  ];

  const contactReasons = [
    {
      title: 'Business Loan Inquiry',
      description: 'Get information about our business funding options from $150k to $5M',
      icon: '💼',
    },
    {
      title: 'Investment Funding',
      description: 'Discuss property investment loans and development finance solutions',
      icon: '🏢',
    },
    
    {
      title: 'Partnership Opportunities',
      description: 'Explore broker partnerships and referral arrangements',
      icon: '🤝',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="text-center lg:text-left">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
                Get In Touch
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Contact Our
                <span className="block text-primary-700">Lending Specialists</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Ready to secure business funding? Our expert team is here to help with same day approvals and personalized lending solutions.
              </p>

              {/* Contact Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Link>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
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
                  src={getAssetPath("/images/blend-archive-O-OM2JdTbrA-unsplash.jpg")}
                  alt="Professional lending consultation and expert advice"
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
                  <div className="text-2xl font-bold text-green-600">24hrs</div>
                  <div className="text-sm text-gray-600">Response</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">Expert</div>
                  <div className="text-xs text-gray-600">Advice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form and our lending specialists will reply as soon as possible.</p>
              {/* Client-side form submission to avoid page jump */}
              <ContactForm />
            </div>
            
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <LazyImage
            src={getAssetPath("/images/kevin-matos-Nl_FMFpXo2g-unsplash.jpg")}
            alt="Professional contact and communication background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            rootMargin="100px"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-white">
              Multiple Ways to Connect
            </h2>
            <div className="flex justify-center">
              <p className="text-primary-100 font-light max-w-2xl text-center">
                Choose the method that works best for you - we're here to help with your funding needs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Contact */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-blue-500 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone</h3>
              </div>
              <div className="mb-4">
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="text-xl font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  {contactInfo.phone}
                </Link>
              </div>
              <p className="text-gray-700 mb-6">
                Speak directly with our lending specialists for immediate assistance and personalized advice.
              </p>
              <Link
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
              >
                Call Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Email Contact */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-emerald-500 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email</h3>
              </div>
              <div className="mb-4">
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors break-all"
                >
                  {contactInfo.email}
                </Link>
              </div>
              <p className="text-gray-700 mb-6">
                Send us detailed information about your funding requirements and we'll respond within 24 hours.
              </p>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
              >
                Send Email
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Business Hours */}
            <div className="p-8 bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-slate-200 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-amber-500 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h3>
              </div>
              <div className="mb-4">
                <p className="text-xl font-semibold text-gray-900">{contactInfo.hours}</p>
                <p className="text-lg text-gray-600 mt-2">Australian EST</p>
              </div>
              <p className="text-gray-700 mb-6">
                Available during business hours for consultations, applications, and general inquiries.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
              >
                Apply Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Reasons Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Can We Help You Today?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whatever your funding need, our experienced team is ready to provide expert guidance and fast solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactReasons.map((reason, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{reason.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 mb-4">{reason.description}</p>
                    <div className="flex items-center gap-2 text-primary-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Expert guidance available</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Service Area */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Serving
                <span className="block text-primary-700">All of Australia</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Based in Queensland but providing funding solutions to businesses across Australia. We understand local markets and deliver nationwide service with a personal touch.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Nationwide lending services</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Local market expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Remote consultation available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Same service standards nationwide</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Call +61 461 534 088
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Apply Online Now
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <LazyImage
                  src={getAssetPath("/images/jamie-davies-Hao52Fu9-F8-unsplash.jpg")}
                  alt="Professional consultation and nationwide service"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  rootMargin="100px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-1">All</div>
                  <div className="text-sm text-gray-600">States & Territories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact AAGT Private Loans',
            description:
              'Contact AAGT Private Loans for business funding inquiries and expert lending advice.',
            url: '/contact',
            mainEntity: {
              '@type': 'FinancialService',
              name: 'AAGT Private Loans',
              telephone: contactInfo.phone,
              email: contactInfo.email,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'AU',
                addressRegion: 'NSW',
              },
              openingHours: 'Mo-Fr 09:00-18:00',
              serviceType: 'Private Lending',
              areaServed: 'Australia',
            },
          }),
        }}
      />
    </>
  );
}
