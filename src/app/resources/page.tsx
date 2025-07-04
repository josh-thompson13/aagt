import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CallToAction } from '@/components/common/CallToAction';
import { ArrowRight, Calculator, FileText, HelpCircle, TrendingUp } from 'lucide-react';
import QuickQuote from '@/components/QuickQuote';

export async function generateMetadata() {
  return {
    title: 'Resources | Business Loan Tools & Guides',
    description:
      'Access loan calculators, business financing guides, FAQs, and industry insights. Educational resources for business owners seeking funding.',
    keywords:
      'business loan calculator, private lending resources, business financing guide, loan tools, funding education',
    alternates: {
      canonical: 'https://aagtprivateloans.com.au/resources',
    },
  };
}

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aagtprivateloans.com.au' },
    { name: 'Resources', url: 'https://aagtprivateloans.com.au/resources' },
  ];

  const tools = [
    {
      icon: Calculator,
      title: 'Loan Calculator',
      description: 'Calculate monthly payments and total interest for your loan',
      link: '#calculator',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: FileText,
      title: 'Application Checklist',
      description: 'Everything you need to prepare for your loan application',
      link: '#checklist',
      color: 'bg-green-50 text-green-700',
    },
    {
      icon: TrendingUp,
      title: 'Business Planning Tools',
      description: 'Templates and guides for business growth planning',
      link: '#planning',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      icon: HelpCircle,
      title: 'FAQ Center',
      description: 'Answers to commonly asked questions about private lending',
      link: '#faq',
      color: 'bg-orange-50 text-orange-700',
    },
  ];

  const guides = [
    {
      category: 'Getting Started',
      title: 'Alternative Lending vs Traditional Banks',
      description: 'Understanding the key differences and when to choose private lending',
      readTime: '5 min read',
      topics: [
        'Speed comparison',
        'Documentation requirements',
        'Approval criteria',
        'Cost analysis',
      ],
    },
    {
      category: 'Loan Types',
      title: 'Business Loan Options Explained',
      description: 'Comprehensive guide to different types of business funding available',
      readTime: '8 min read',
      topics: ['Working capital loans', 'Equipment finance', 'Bridge loans', 'Second mortgages'],
    },
    {
      category: 'Application Process',
      title: 'How to Prepare Your Loan Application',
      description: 'Step-by-step guide to putting together a strong loan application',
      readTime: '10 min read',
      topics: [
        'Required documents',
        'Financial statements',
        'Security requirements',
        'Common mistakes',
      ],
    },
    {
      category: 'Investment',
      title: 'Property Development Finance Guide',
      description: 'Everything you need to know about funding property development projects',
      readTime: '12 min read',
      topics: ['Development phases', 'Progress payments', 'Exit strategies', 'Risk management'],
    },
  ];

  const faqs = [
    {
      question: 'What is the minimum loan amount?',
      answer:
        'Our minimum loan amount is $150,000. This ensures we can provide cost-effective funding while maintaining our streamlined approval process.',
    },
    {
      question: 'How quickly can I get approved?',
      answer:
        'Most applications receive same-day approval. Complex cases may take up to 48 hours. Once approved, settlements typically occur within 4 working days.',
    },
    {
      question: 'What security do you accept?',
      answer:
        'We accept residential and commercial real estate as security. Properties must be in Australia and professionally valued.',
    },
    {
      question: 'Can I repay my loan early?',
      answer:
        'Yes, you can repay your loan early without penalty fees. We encourage early repayment to minimize interest costs.',
    },
    {
      question: 'What if banks have declined my application?',
      answer:
        "Bank declines don't automatically disqualify you. We assess applications based on security strength and ability to service the loan, not just credit scores.",
    },
    {
      question: 'Do you charge application fees?',
      answer:
        "No, we don't charge application fees. You only pay for professional services like valuations and legal costs, which are disclosed upfront.",
    },
  ];

  const resourcesSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Business Loan Resources and Tools',
    description:
      'Comprehensive resources for business owners seeking alternative funding solutions',
    provider: {
      '@type': 'FinancialService',
      name: 'AAGT Private Loans',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <StructuredData data={resourcesSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Resources & Tools
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Everything you need to make informed decisions about business funding and private
              lending
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-primary-700 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-white/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Try Our Calculator
                <Calculator className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#guides"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white border-2 border-white hover:bg-white hover:text-primary-700 focus:ring-4 focus:ring-white/50 transition-all duration-200"
              >
                Browse Guides
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20" id="tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Business Funding Tools
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Access our suite of tools designed to help you understand, plan, and apply for
              business funding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <a
                key={index}
                href={tool.link}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div
                  className={`w-16 h-16 rounded-lg ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <tool.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quote Section */}
      <section className="py-20 bg-gray-50" id="calculator">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quick Quote Calculator
            </h2>
            <p className="text-lg text-gray-700">
              Get an instant estimate of your total interest and repayment amount.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <QuickQuote />
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-20" id="guides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Educational Guides
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Comprehensive guides to help you understand private lending and make informed funding
              decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                    {guide.category}
                  </span>
                  <span className="text-sm text-gray-500">{guide.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
                <p className="text-gray-600 mb-6">{guide.description}</p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-gray-700">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {guide.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-700 rounded-full mr-2 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center text-primary-700 font-medium hover:text-primary-600 transition-colors"
                >
                  Request Guide
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700">
              Get answers to the most common questions about private lending and our loan products.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Can't find what you're looking for?</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white bg-primary-700 hover:bg-primary-600 focus:ring-4 focus:ring-primary-200 transition-colors"
            >
              Ask Our Specialists
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Checklist */}
      <section className="py-20" id="checklist">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Application Checklist
            </h2>
            <p className="text-lg text-gray-700">
              Prepare these documents to streamline your application process.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Required Documents</h3>
                <div className="space-y-4">
                  {[
                    "Photo identification (Driver's license or passport)",
                    'Recent financial statements (last 2 years)',
                    'Bank statements (last 3 months)',
                    'Property details and contracts (if applicable)',
                    'Business registration documents',
                    'Tax returns (if self-employed)',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 border-2 border-gray-300 rounded mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tips for Success</h3>
                <div className="space-y-4">
                  {[
                    'Ensure all documents are current and complete',
                    'Provide clear, legible copies or scans',
                    'Include explanations for any unusual transactions',
                    'Have property valuations ready if available',
                    'Prepare a brief business summary or purpose',
                    'Be honest about your financial situation',
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-700 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            Use our resources to prepare, then apply for funding that works for your business.
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our lending specialists are here to guide you through the process and answer any
            questions you may have about private lending solutions.
          </p>
          <CallToAction />
        </div>
      </section>
    </>
  );
}
