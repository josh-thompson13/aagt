'use client';

import { AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ApplicationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    // Web3Forms (provided as hidden input for static hosting)
    access_key: 'fb6c8a57-15b3-489f-989d-f155d8b1c4b2',
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
    // Property Addresses
    propertyAddresses: [''],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Pre-fill loan amount from URL parameter
  useEffect(() => {
    const amount = searchParams.get('amount');
    if (amount) {
      setFormData(prev => ({
        ...prev,
        loanAmount: amount
      }));
    }
  }, [searchParams]);

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

  // Handler for property address change
  const handlePropertyAddressChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.propertyAddresses];
      updated[index] = value;
      return { ...prev, propertyAddresses: updated };
    });
  };

  // Handler to add a new property address
  const handleAddPropertyAddress = () => {
    setFormData((prev) => ({
      ...prev,
      propertyAddresses: [...prev.propertyAddresses, ''],
    }));
  };

  // Handler to remove a property address
  const handleRemovePropertyAddress = (index: number) => {
    setFormData((prev) => {
      const updated = [...prev.propertyAddresses];
      updated.splice(index, 1);
      return { ...prev, propertyAddresses: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submit triggered', formData);

    // Validate minimum loan amount
    const loanAmountNum = parseInt(formData.loanAmount.replace(/[^0-9]/g, ''));
    console.log('Loan amount validation:', loanAmountNum, 'Required minimum: 150000');
    
    if (loanAmountNum < 150000) {
      console.log('Validation failed: Loan amount too low');
      setSubmitStatus({
        type: 'error',
        message: 'Minimum loan amount is $150,000.',
      });
      return;
    }

    console.log('Terms agreed:', formData.agreeToTerms);
    if (!formData.agreeToTerms) {
      console.log('Validation failed: Terms not agreed');
      setSubmitStatus({
        type: 'error',
        message: 'Please agree to the Terms and Conditions to continue.',
      });
      return;
    }

    console.log('All validations passed, proceeding with submission');

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const { submitForm } = await import('@/lib/form-handler');

      // Build a minimal payload: only include fields present on this form
      const amountOnlyDigits = formData.loanAmount.replace(/[^0-9]/g, '');
      const loanAmountFormatted = amountOnlyDigits
        ? `$${parseInt(amountOnlyDigits, 10).toLocaleString()}`
        : '';

      const submission = {
        access_key: formData.access_key,
        _form: 'application',
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        borrowingEntity: formData.borrowingEntity,
        loanAmount: loanAmountFormatted,
        preferredTerm: formData.preferredTerm,
        fundsRequiredDate: formData.fundsRequiredDate,
        loanPurpose: formData.loanPurpose,
        securityOffered: formData.securityOffered,
        propertyValue: formData.propertyValue,
        debtOwing: formData.debtOwing,
        propertyAddresses: formData.propertyAddresses.filter(Boolean),
        agreeToTerms: formData.agreeToTerms ? 'yes' : 'no',
      } as const;

      await submitForm({
        endpoint: '/api/apply',
        data: submission,
        onSuccess: () => {
          router.push('/apply/thank-you');
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
        {/* Hidden fields for Web3Forms */}
        <input type="hidden" name="access_key" value={formData.access_key} readOnly />
        <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
        {/* Contact Information + Business & Personal Information */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
            Quick Contact
          </h3>
          {/* Email */}
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
          {/* Personal Details */}
          <div className="mt-6">
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
              <div className="md:col-span-1">
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
                placeholder="e.g. Real estate, shares, boat, vehicle, truck"
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
                Property Address(es) (if applicable)
              </label>
              {formData.propertyAddresses.map((address, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="text"
                    name={`propertyAddress_${idx}`}
                    value={address}
                    onChange={e => handlePropertyAddressChange(idx, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    placeholder={`Property address ${idx + 1}, city, state, postcode`}
                  />
                  {formData.propertyAddresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePropertyAddress(idx)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Remove address"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPropertyAddress}
                className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add another property address
              </button>
            </div>
          </div>
        </div>

        {/* Agree to Terms & Privacy Policy */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
          <div className="space-y-4">
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
                <Link href="/terms-and-conditions" className="text-primary-700 hover:text-primary-600 underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-primary-700 hover:text-primary-600 underline">
                  Privacy Policy
                </Link>{' '}
                *
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => console.log('Submit button clicked!')}
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
              credit checks and assess your application according to our lending
              criteria. Applications are subject to credit approval and AAGT Private Loans'
              lending criteria. This application does not constitute financial advice - consider
              seeking independent financial advice if needed.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
