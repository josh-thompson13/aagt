import { ContactSection } from '@/components/prestige/ContactSection';
import { Clock, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | AAGT Private Loans',
  description: 'Contact AAGT Private Loans for business funding inquiries. Get same day approval for loans from $150,000 to $5,000,000. Speak to our lending specialists today.',
  keywords: 'contact AAGT private loans, business loan contact, private lending inquiry, loan specialist contact, business funding help',
  alternates: {
    canonical: 'https://aagtprivateloans.com.au/contact',
  },
  openGraph: {
    title: 'Contact Us | AAGT Private Loans',
    description: 'Contact AAGT Private Loans for business funding inquiries and expert lending advice.',
    url: 'https://aagtprivateloans.com.au/contact',
    siteName: 'AAGT Private Loans',
    images: [
      {
        url: 'https://aagtprivateloans.com.au/og-contact.jpg',
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
    images: ['https://aagtprivateloans.com.au/og-contact.jpg'],
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

const contactInfo = {
  email: 'aagtpvtloans@gmail.com',
  phone: '+61 461 534 088',
  hours: 'Mon-Fri 9AM-6PM',
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Contact Our Lending Specialists
            </h1>
            <div className="flex justify-center">
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-10 font-normal leading-relaxed text-center">
                Ready to secure your business funding? Get in touch with our expert lending team for same day approval.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <Phone className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-slate-600 hover:text-primary-500 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <Mail className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-600 hover:text-primary-500 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <Clock className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Business Hours</h3>
                <p className="text-slate-600">
                  {contactInfo.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-primary-900">
        <ContactSection />
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'name': 'Contact AAGT Private Loans',
            'description': 'Contact AAGT Private Loans for business funding inquiries and expert lending advice.',
            'url': 'https://aagtprivateloans.com.au/contact',
            'mainEntity': {
              '@type': 'FinancialService',
              'name': 'AAGT Private Loans',
              'telephone': contactInfo.phone,
              'email': contactInfo.email,
              'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'AU',
                'addressRegion': 'NSW',
              },
              'openingHours': 'Mo-Fr 09:00-18:00',
              'serviceType': 'Private Lending',
            },
          }),
        }}
      />
    </div>
  );
}