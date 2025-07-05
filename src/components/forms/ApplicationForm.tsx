'use client';

import { DocumentUpload } from '@/components/molecules/DocumentUpload';
import type { UploadedFile } from '@/types/application';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

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
    // Additional Required Fields
    borrowingEntity: '',
    directorsNames: '',
    fundsRequiredDate: '',
    securityOffered: '',
    debtOwing: '',
    bankruptcyHistory: '',
    exitStrategy: '',
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
      let newValue = value;
      
      // Format loan amount as currency
      if (name === 'loanAmount') {
        // Remove non-numeric characters
        newValue = value.replace(/[^0-9]/g, '');
        // Limit to reasonable amount
        if (parseInt(newValue) > 50000000) {
          newValue = '50000000';
        }
      }
      
      // Format phone number
      if (name === 'phone' && value.length <= 12) {
        newValue = value.replace(/[^0-9]/g, '');
        if (newValue.length >= 4 && newValue.length <= 6) {
          newValue = newValue.slice(0, 4) + ' ' + newValue.slice(4);
        } else if (newValue.length >= 7) {
          newValue = newValue.slice(0, 4) + ' ' + newValue.slice(4, 7) + ' ' + newValue.slice(7, 10);
        }
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate minimum loan amount
    const loanAmountNum = parseInt(formData.loanAmount.replace(/[^0-9]/g, ''));
    if (loanAmountNum < 150000) {
      setSubmitStatus({
        type: 'error',
        message: 'Minimum loan amount is $150,000.',
      });
      return;
    }

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
      const { submitForm } = await import('@/lib/form-handler');
      await submitForm({
        endpoint: '/api/apply',
        data: formData,
        onSuccess: (data) => {
          setSubmitStatus({
            type: 'success',
            message: data.isDemo ? data.message :
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
          borrowingEntity: '',
          directorsNames: '',
          fundsRequiredDate: '',
          securityOffered: '',
          debtOwing: '',
          bankruptcyHistory: '',
          exitStrategy: '',
          declinedByBanks: false,
          workingWithBroker: false,
          agreeToTerms: false,
          receiveUpdates: false,
        });
        setDocuments([]);
        },
        onError: (error) => {
          setSubmitStatus({
            type: 'error',
            message: error,
          });
        },
      });
    } catch (error) {
      // Error already handled by onError callback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
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
        {/* Contact Information */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
            Quick Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex items-end pb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition-colors duration-200 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Sign up for news and updates
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. Loan Details */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
            Loan Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Loan Amount * (Minimum $150,000)
              </label>
              <input
                type="text"
                name="loanAmount"
                value={formData.loanAmount ? `$${parseInt(formData.loanAmount.replace(/[^0-9]/g, '') || '0').toLocaleString()}` : ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="Enter amount (minimum $150,000)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term *</label>
              <select
                name="preferredTerm"
                value={formData.preferredTerm}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                When are Funds Required? *
              </label>
              <input
                type="text"
                name="fundsRequiredDate"
                value={formData.fundsRequiredDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. on 12th of March"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is Loan Purpose? *
              </label>
              <textarea
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. Purchase a property, Refinance, Site Amalgamation, Investment"
              />
            </div>
          </div>
        </div>

        {/* 3. Security Details */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
            Security Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What type of Security is offered? *
              </label>
              <textarea
                name="securityOffered"
                value={formData.securityOffered}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. Office Building, House, Vacant land"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is Estimated Value? *
              </label>
              <input
                type="text"
                name="propertyValue"
                value={formData.propertyValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. RE appraisal of $1.2 million"
                title="Include any recent valuations or appraisals if available"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any debt owing? To who? *
              </label>
              <input
                type="text"
                name="debtOwing"
                value={formData.debtOwing}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. Nil Owing, $200,000 to ANZ"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="Property address, city, state, postcode"
              />
            </div>
          </div>
        </div>

        {/* 4. Business & Personal Information */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
            Business & Personal Information
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    placeholder="Enter your last name"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    placeholder="04XX XXX XXX"
                  />
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Business Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name of Borrowing Entity *
                  </label>
                  <input
                    type="text"
                    name="borrowingEntity"
                    value={formData.borrowingEntity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    placeholder="e.g. Ajax p/l as Trustee for the AJAX Trust"
                title="Enter the full legal name of the borrowing entity"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Names of Directors *
                  </label>
                  <input
                    type="text"
                    name="directorsNames"
                    value={formData.directorsNames}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    placeholder="List all directors' names"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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

        {/* 5. Supporting Documents */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
            Supporting Documents
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
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-sm">
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

        {/* 6. Additional Information */}
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
            Additional Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you/ have you ever been Bankrupt? (Does not Disqualify) *
              </label>
              <input
                type="text"
                name="bankruptcyHistory"
                value={formData.bankruptcyHistory}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. Yes, but was discharged in 2017 / No, never"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your Exit Strategy? How do you propose to repay the loan? *
              </label>
              <textarea
                name="exitStrategy"
                value={formData.exitStrategy}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                placeholder="e.g. Sell shares, Refinance, Incoming cash, Inheritance"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold rounded-lg text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing your application...
              </>
            ) : (
              <>
                Submit Application
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
