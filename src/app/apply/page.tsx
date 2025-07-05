import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import ApplicationForm from '@/components/forms/ApplicationForm';
import { Suspense } from 'react';

export async function generateMetadata() {
  return {
    title: 'Loan Application | AAGT Private Loans',
    description:
      'Complete your business loan application for same-day response. Simple form, minimal documentation. $150,000 to $5,000,000 available.',
    keywords:
      'loan application, business loan form, apply for business funding, private loan application Australia',
    alternates: {
      canonical: '/apply',
    },
  };
}

export default function ApplyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Loan Application', url: '/apply' },
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

      {/* Application Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Loan Application</h1>
            <p className="text-lg text-gray-700">
              Complete this form for a same-day response
            </p>
          </div>

          <Suspense fallback={<div className="text-center py-8">Loading application form...</div>}>
            <ApplicationForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
