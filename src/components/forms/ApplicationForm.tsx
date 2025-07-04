'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, User, DollarSign, Shield, Upload } from 'lucide-react';
import { DocumentUpload } from '@/components/molecules/DocumentUpload';
import type { UploadedFile } from '@/types/application';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    // Loan Details
    loanAmount: '',
    loanPurpose: '',
    preferredTerm: '',
    // Security Details
    propertyType: '',
    propertyValue: '',
    propertyAddress: '',
    // Applicant Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    abn: '',
    businessAddress: '',
    industry: '',
    yearsInBusiness: '',
    // Additional Information
    declinedByBanks: false,
    workingWithBroker: false,
    agreeToTerms: false,
    receiveUpdates: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [documents, setDocuments] = useState<UploadedFile[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
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
        message: 'Please agree to the Terms and Conditions to continue.',
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
          message:
            data.message ||
            'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.',
        });
        // Reset form on success
        setFormData({
          loanAmount: '',
          loanPurpose: '',
          preferredTerm: '',
          propertyType: '',
          propertyValue: '',
          propertyAddress: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          abn: '',
          businessAddress: '',
          industry: '',
          yearsInBusiness: '',
          declinedByBanks: false,
          workingWithBroker: false,
          agreeToTerms: false,
          receiveUpdates: false,
        });
        setDocuments([]);
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg border flex items-center gap-3 mb-6 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="font-medium">{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* 1. Loan Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-300 pb-3">
            <DollarSign className="h-6 w-6 text-primary-700 mr-3" />
            1. Loan Details
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term *</label>
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

        {/* 2. Security Details */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b border-blue-300 pb-3">
            <Shield className="h-6 w-6 text-primary-700 mr-3" />
            2. Security Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select property type</option>
                <option value="residential">Residential Property</option>
                <option value="commercial">Commercial Property</option>
                <option value="industrial">Industrial Property</option>
                <option value="development">Development Site</option>
                <option value="mixed-use">Mixed Use</option>
                <option value="other">Other Asset Type</option>
                <option value="none">No Security Property</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Value *
              </label>
              <input
                type="text"
                name="propertyValue"
                value={formData.propertyValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="$XXX,XXX"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address
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

        {/* 3. Applicant Information */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b border-green-300 pb-3">
            <User className="h-6 w-6 text-primary-700 mr-3" />
            3. Applicant Information
          </h3>
          <div className="space-y-6">
            {/* Personal Details */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h4>
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

            {/* Business Details */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Business Details</h4>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">ABN</label>
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
          </div>
        </div>

        {/* 4. Supporting Documents */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b border-purple-300 pb-3">
            <Upload className="h-6 w-6 text-primary-700 mr-3" />
            4. Supporting Documents
          </h3>
          <div className="space-y-6">
            <DocumentUpload
              category="supporting-documents"
              title="Required Documents"
              description="Upload the required documentation to support your loan application. All documents will be securely encrypted."
              acceptedFileTypes={['application/pdf', '.doc', '.docx', '.xls', '.xlsx', 'image/*']}
              maxFiles={10}
              files={documents}
              onFilesChange={setDocuments}
              required
            />
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Suggested Documents:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bank statements (last 3 months)</li>
                <li>• Business financial statements</li>
                <li>• Tax returns or BAS statements</li>
                <li>• Property valuation or contract of sale</li>
                <li>• Business registration/incorporation documents</li>
                <li>• Identification documents (driver's license, passport)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-orange-300 pb-3">
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
                  I agree to the{' '}
                  <a href="#" className="text-primary-700 hover:text-primary-600 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-700 hover:text-primary-600 underline">
                    Privacy Policy
                  </a>{' '}
                  *
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
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold rounded-lg text-white bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-600 hover:to-primary-500 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

          {/* Professional Disclaimer */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 leading-relaxed">
              By submitting this application, you acknowledge that AAGT Private Loans will conduct
              credit checks and assess your application according to responsible lending
              obligations. Applications are subject to credit approval and AAGT Private Loans'
              lending criteria. This application does not constitute financial advice - consider
              seeking independent financial advice if needed. AAGT Private Loans is committed to
              responsible lending practices.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
