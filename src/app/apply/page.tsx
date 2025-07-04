import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CheckCircle2, Clock, FileText, Shield, Phone, Mail } from 'lucide-react';
import ApplicationForm from '@/components/forms/ApplicationForm';

export async function generateMetadata() {
  return {
    title: 'Apply Now | Fast Business Loan Application',
    description:
      'Apply for your business loan online. Fast application process with same day approval and 4-day settlement. $150,000 to $5,000,000 available.',
    keywords:
      'apply business loan, fast loan application, online business funding application, private loan application Australia',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au/apply',
    },
  };
}

export default function ApplyPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aagtprivateloans.com.au' },
    { name: 'Apply Now', url: 'https://aagtprivateloans.com.au/apply' },
  ];

  const process = [
    {
      step: 1,
      title: 'Complete Application',
      description:
        'Fill out our single-page application form with loan details, security information, and upload documents',
      time: '10 minutes',
    },
    {
      step: 2,
      title: 'Instant Submission',
      description: 'Your application is immediately submitted for review',
      time: 'Instant',
    },
    {
      step: 3,
      title: 'Fast Assessment',
      description: 'Our team reviews your application and documents',
      time: '2-4 hours',
    },
    {
      step: 4,
      title: 'Same Day Approval',
      description: 'Receive your approval decision and funding terms',
      time: 'Same day',
    },
  ];

  const benefits = [
    { icon: Clock, text: 'Same day approval' },
    { icon: FileText, text: 'Minimal documentation' },
    { icon: Shield, text: 'Secure application process' },
    { icon: CheckCircle2, text: 'No application fees' },
  ];

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Business Loan Application',
    description: 'Apply for fast business funding with AAGT Private Loans',
    provider: {
      '@type': 'FinancialService',
      name: 'AAGT Private Loans',
    },
    mainEntity: {
      '@type': 'LoanOrCredit',
      name: 'Business Loan Application',
      description: 'Fast business loan application with same day approval',
      amount: {
        '@type': 'MonetaryAmount',
        minValue: 150000,
        maxValue: 5000000,
        currency: 'AUD',
      },
    },
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={applicationSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Apply for Your Business Loan
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Complete our fast application and get same day approval for funding from $150,000 to
              $5,000,000
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <benefit.icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 4-Step Process</h2>
            <p className="text-lg text-gray-700">
              From application to approval in hours, not weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <span className="text-sm font-medium text-primary-700">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Application</h2>
            <p className="text-lg text-gray-700">
              Complete the form below to begin your loan application process
            </p>
          </div>

          <ApplicationForm />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need Help with Your Application?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our lending specialists are here to assist you through the application process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Phone className="h-8 w-8 text-primary-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with a lending specialist</p>
              <a
                href="tel:+61461534088"
                className="text-primary-700 font-semibold hover:text-primary-600"
              >
                +61 461 534 088
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mail className="h-8 w-8 text-primary-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed information via email</p>
              <a
                href="mailto:aagtpvtloans@gmail.com"
                className="text-primary-700 font-semibold hover:text-primary-600"
              >
                aagtpvtloans@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
