import Link from 'next/link';

export const metadata = {
  title: 'Application Submitted | AAGT Private Loans',
  description:
    'Thank you for your loan application. A lending specialist will contact you shortly.',
  alternates: { canonical: '/apply/thank-you' },
};

export default function ApplicationThankYouPage() {
  return (
    <section className="relative bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 text-2xl font-bold">
            ✓
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Thank You For Your Application
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We’ve received your details. A lending specialist will review your application and contact you within 8 business hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
         
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

