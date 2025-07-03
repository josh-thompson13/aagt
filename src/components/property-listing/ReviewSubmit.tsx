'use client';

import { useState } from 'react';

type PropertyDetailsValues = {
  propertyType: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  price: string;
  description: string;
  features?: string;
};

type ReviewSubmitProps = {
  propertyDetails: PropertyDetailsValues;
  selectedAgentId: string | null;
  onBack: () => void;
  onSubmit: () => void;
};

const mockAgents = {
  '1': 'Sarah Johnson',
  '2': 'Michael Chen',
  '3': 'Emily Rodriguez'
};

export const ReviewSubmit = ({ propertyDetails, selectedAgentId, onBack, onSubmit }: ReviewSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit();
    setIsSubmitting(false);
  };

  const getAgentName = (agentId: string | null) => {
    if (!agentId) return 'Self-managed listing';
    return mockAgents[agentId as keyof typeof mockAgents] || 'Unknown Agent';
  };

  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
      <p className="text-gray-600 mb-6">
        Please review your property details before submitting your listing.
      </p>
      
      <div className="space-y-6 mb-8">
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-3">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Property Type</p>
              <p className="font-medium capitalize">{propertyDetails.propertyType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">{propertyDetails.price}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{propertyDetails.address}</p>
            </div>
            {(propertyDetails.bedrooms || propertyDetails.bathrooms || propertyDetails.parking) && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Features</p>
                <div className="flex gap-4">
                  {propertyDetails.bedrooms && (
                    <span className="font-medium">{propertyDetails.bedrooms} bed</span>
                  )}
                  {propertyDetails.bathrooms && (
                    <span className="font-medium">{propertyDetails.bathrooms} bath</span>
                  )}
                  {propertyDetails.parking && (
                    <span className="font-medium">{propertyDetails.parking} parking</span>
                  )}
                </div>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">{propertyDetails.description}</p>
            </div>
            {propertyDetails.features && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Additional Features</p>
                <p className="font-medium">{propertyDetails.features}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-3">Agent Selection</h3>
          <p className="font-medium">{getAgentName(selectedAgentId)}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your listing will be reviewed within 24 hours</li>
            <li>• You'll receive a confirmation email once approved</li>
            <li>• Your property will be visible on our platform</li>
            {selectedAgentId && <li>• Your selected agent will contact you within 48 hours</li>}
          </ul>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-sm"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Listing'
          )}
        </button>
      </div>
    </div>
  );
};