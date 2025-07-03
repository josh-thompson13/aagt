import { StructuredData } from '@/components/common/StructuredData';
import { breadcrumbSchema } from '@/utils/structuredData';
import { CheckCircle2, Clock, FileText, Shield, Phone, Mail, User, Building, DollarSign, Calendar } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Apply Now | Fast Business Loan Application',
    description: 'Apply for your business loan online. Fast application process with same day approval and 4-day settlement. $150,000 to $5,000,000 available.',
    keywords: 'apply business loan, fast loan application, online business funding application, private loan application Australia',
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
      description: 'Fill out our streamlined application form',
      time: '5 minutes'
    },
    {
      step: 2,
      title: 'Document Upload',
      description: 'Upload required documents securely',
      time: '10 minutes'
    },
    {
      step: 3,
      title: 'Assessment',
      description: 'We review your application immediately',
      time: '2-4 hours'
    },
    {
      step: 4,
      title: 'Approval',
      description: 'Receive your approval decision',
      time: 'Same day'
    }
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
    'name': 'Business Loan Application',
    'description': 'Apply for fast business funding with AAGT Private Loans',
    'provider': {
      '@type': 'FinancialService',
      'name': 'AAGT Private Loans',
    },
    'mainEntity': {
      '@type': 'LoanOrCredit',
      'name': 'Business Loan Application',
      'description': 'Fast business loan application with same day approval',
      'amount': {
        '@type': 'MonetaryAmount',
        'minValue': 150000,
        'maxValue': 5000000,
        'currency': 'AUD'
      }
    }
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
              Complete our fast application and get same day approval for funding from $150,000 to $5,000,000
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Application
            </h2>
            <p className="text-lg text-gray-700">
              Complete the form below to begin your loan application process
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 text-primary-700 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="04XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building className="h-6 w-6 text-primary-700 mr-2" />
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ABN
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="XX XXX XXX XXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Street address, city, state, postcode"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry/Business Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      <option value="construction">Construction</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="professional-services">Professional Services</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years in Business *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select years</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Loan Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 text-primary-700 mr-2" />
                  Loan Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount Required *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select amount</option>
                      <option value="150000-250000">$150,000 - $250,000</option>
                      <option value="250000-500000">$250,000 - $500,000</option>
                      <option value="500000-1000000">$500,000 - $1,000,000</option>
                      <option value="1000000-2500000">$1,000,000 - $2,500,000</option>
                      <option value="2500000-5000000">$2,500,000 - $5,000,000</option>
                      <option value="5000000+">$5,000,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select loan type</option>
                      <option value="business-loan">Business Loan</option>
                      <option value="investment-loan">Investment Loan</option>
                      <option value="bridge-finance">Bridge Finance</option>
                      <option value="second-mortgage">Second Mortgage</option>
                      <option value="development-finance">Development Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Term *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select term</option>
                      <option value="1-3">1-3 months</option>
                      <option value="3-6">3-6 months</option>
                      <option value="6-12">6-12 months</option>
                      <option value="12-18">12-18 months</option>
                      <option value="18-24">18-24 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      When do you need funds? *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select timeframe</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-week">Within 1 week</option>
                      <option value="2-weeks">Within 2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Loan *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Please describe the purpose of your loan and how it will be used..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="h-6 w-6 text-primary-700 mr-2" />
                  Security Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you own property that can be used as security?
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select option</option>
                      <option value="yes-residential">Yes - Residential property</option>
                      <option value="yes-commercial">Yes - Commercial property</option>
                      <option value="yes-both">Yes - Both residential and commercial</option>
                      <option value="no">No</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Property Value
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="$XXX,XXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address (if applicable)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Property address, city, state, postcode"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        I have been declined by traditional banks
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        I am working with a mortgage broker
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        I agree to the <a href="#" className="text-primary-700 hover:text-primary-600 underline">Terms and Conditions</a> and <a href="#" className="text-primary-700 hover:text-primary-600 underline">Privacy Policy</a> *
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        I would like to receive updates about loan products and industry insights
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold rounded-lg text-white bg-primary-700 hover:bg-primary-600 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Submit Application
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  Secure 256-bit SSL encryption. Your information is protected.
                </p>
              </div>
            </form>
          </div>
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
                href="tel:1300123456"
                className="text-primary-700 font-semibold hover:text-primary-600"
              >
                1300 123 456
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mail className="h-8 w-8 text-primary-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed information via email</p>
              <a
                href="mailto:apply@aagtprivateloans.com.au"
                className="text-primary-700 font-semibold hover:text-primary-600"
              >
                apply@aagtprivateloans.com.au
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}