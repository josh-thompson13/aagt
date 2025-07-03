'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, User, Building, DollarSign, Shield } from 'lucide-react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Business Information
    businessName: '',
    abn: '',
    businessAddress: '',
    industry: '',
    yearsInBusiness: '',
    // Loan Requirements
    loanAmount: '',
    loanType: '',
    preferredTerm: '',
    timeframe: '',
    loanPurpose: '',
    // Security Information
    hasProperty: '',
    propertyValue: '',
    propertyAddress: '',
    // Additional Information
    declinedByBanks: false,
    workingWithBroker: false,
    agreeToTerms: false,
    receiveUpdates: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      setSubmitStatus({
        type: 'error',
        message: 'Please agree to the Terms and Conditions to continue.'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.',
        });
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          abn: '',
          businessAddress: '',
          industry: '',
          yearsInBusiness: '',
          loanAmount: '',
          loanType: '',
          preferredTerm: '',
          timeframe: '',
          loanPurpose: '',
          hasProperty: '',
          propertyValue: '',
          propertyAddress: '',
          declinedByBanks: false,
          workingWithBroker: false,
          agreeToTerms: false,
          receiveUpdates: false
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Status Message */}
      {submitStatus.type && (
        <div className={`p-4 rounded-lg border flex items-center gap-3 mb-6 ${
          submitStatus.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}
        >
          {submitStatus.type === 'success'
            ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              )
            : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
          <p className="font-medium">{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
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
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
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
                name="abn"
                value={formData.abn}
                onChange={handleChange}
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
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
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
                name="industry"
                value={formData.industry}
                onChange={handleChange}
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
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
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

        {/* Loan Requirements */}
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
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
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
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
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
                name="preferredTerm"
                value={formData.preferredTerm}
                onChange={handleChange}
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
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
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
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Please describe the purpose of your loan and how it will be used..."
              />
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
                name="hasProperty"
                value={formData.hasProperty}
                onChange={handleChange}
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
                name="propertyValue"
                value={formData.propertyValue}
                onChange={handleChange}
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
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
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
                  name="declinedByBanks"
                  checked={formData.declinedByBanks}
                  onChange={handleChange}
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
                  name="workingWithBroker"
                  checked={formData.workingWithBroker}
                  onChange={handleChange}
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
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
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
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onChange={handleChange}
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
            disabled={isSubmitting}
            className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold rounded-lg text-white bg-primary-700 hover:bg-primary-600 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Secure 256-bit SSL encryption. Your information is protected.
          </p>
        </div>
      </form>
    </div>
  );
}