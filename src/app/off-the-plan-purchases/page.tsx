import { CallToAction } from '@/components/common/CallToAction';
import { LazyImage } from '@/components/common/LazyImage';
import { StructuredData } from '@/components/common/StructuredData';
import { getAssetPath } from '@/utils/Helpers';
import { breadcrumbSchema } from '@/utils/structuredData';
import { ArrowRight, User, Briefcase, HeartCrack, UserX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Off-the-Plan Purchases | Fund Your Settlement, Keep Your Gain',
    description:
      "Bank won't lend at settlement after an off-the-plan contract? We fund the shortfall so you can complete and keep your capital gain.",
    keywords:
      "off the plan finance, settlement shortfall funding, complete off the plan purchase, private lending for OTP, bank declined settlement, bank won't let me settle my property, bank won't lend at settlement",
    alternates: {
      canonical: '/off-the-plan-purchases',
    },
  };
}

export default function OffThePlanPurchasesPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Off-the-Plan Purchases', url: '/off-the-plan-purchases' },
  ];

  const declineReasons = [
    { icon: User, text: 'Age or retirement change' },
    { icon: Briefcase, text: 'Reduced income or job change' },
    { icon: HeartCrack, text: 'Divorce or relationship separation' },
    { icon: UserX, text: "Partner’s death impacting servicing" },
  ];

  const reasonIconStyles = [
    { bg: 'bg-purple-100', fg: 'text-purple-700' },
    { bg: 'bg-blue-100', fg: 'text-blue-700' },
    { bg: 'bg-rose-100', fg: 'text-rose-700' },
    { bg: 'bg-slate-100', fg: 'text-slate-700' },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      {/* Breadcrumb structured data */}

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={getAssetPath('/images/luke-van-zyl-koH7IVuwRLw-unsplash.jpg')}
                  alt="Newly completed apartments ready for settlement"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$5M</div>
                  <div className="text-sm text-gray-600">Max Loan</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">Same Day</div>
                  <div className="text-xs text-gray-600">Approval</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-4">
                Ask About Our Off-the-Plan Settlement Solution
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Off-the-Plan Purchases
                <span className="block text-primary-700">Complete And Keep Your Gain</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-6">
                Contracted off-the-plan but the bank won’t lend at settlement? We fund the shortfall so you can complete and protect your capital gain.
              </p>

              <div className="mb-8 text-base text-gray-700 bg-primary-50 border border-primary-100 rounded-lg p-4">
                If this scenario is you, don’t miss out on your capital gain — contact us immediately. AAGT has the solution for you.
              </div>

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
                  Speak to a Specialist
                </Link>
              </div>

              {/* Reasons moved to dedicated section below */}
            </div>
          </div>
        </div>
      </section>

      

      {/* Reasons Banks Decline Settlement (blue with background image) */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/90" />
          <LazyImage
            src={getAssetPath('/images/kevin-matos-Nl_FMFpXo2g-unsplash.jpg')}
            alt="Settlement funding background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            rootMargin="100px"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
              Common Reasons Banks Decline OTP Settlement
            </h2>
            <p className="text-primary-100/90 mb-8">
              Circumstances can change between contract and completion. The factors below often affect servicing capacity or policy fit with major banks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {declineReasons.map((reason, i) => {
                const defaultStyle = { bg: 'bg-gray-100', fg: 'text-gray-700' } as const;
                const style = reasonIconStyles[i % reasonIconStyles.length] ?? defaultStyle;
                return (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className={`p-2 rounded-lg ${style.bg}`}>
                      <reason.icon className={`h-5 w-5 ${style.fg}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{reason.text}</span>
                  </div>
                );
              })}
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">How Settlement Funding Helps</h3>
            <p className="text-primary-100/95 mb-8">
              Specialist settlement funding can bridge the shortfall so you can complete on time, protect your equity uplift, and later refinance when income and documentation are back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Apply For Settlement Funding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-white hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Speak With A Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Case Study: Off‑the‑Plan Settlement Shortfall
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                A couple contracted to buy an apartment for $1,000,000. Three years later, at completion, the apartment was valued at $1,500,000. Following a change in employment and a temporary reduction in household income, their bank declined to provide funds at settlement.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Contract price: $1,000,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Valuation at settlement (3 years later): $1,500,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-gray-700">Potential equity uplift at risk: $500,000</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-8">
                In cases like this, settlement funding can complete the purchase, preserve the equity uplift, and allow refinance once circumstances stabilise — the kind of outcome many clients pursue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Your Application
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-700 bg-white border-2 border-primary-700 hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Talk to Us Today
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <LazyImage
                  src={getAssetPath('/images/jamie-davies-Hao52Fu9-F8-unsplash.jpg')}
                  alt="Successful off-the-plan settlement with private funding"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  rootMargin="100px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-1">$500k</div>
                  <div className="text-sm text-gray-600">Equity Uplift Preserved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CallToAction />
    </>
  );
}
