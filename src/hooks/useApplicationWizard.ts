'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ApplicationData, ApplicationStep, FormProgress, StepValidationResult } from '@/types/application';

const APPLICATION_STEPS: ApplicationStep[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Your personal details and identification',
    isRequired: true,
    isCompleted: false,
    canSkip: false,
  },
  {
    id: 'business',
    title: 'Business Information',
    description: 'Details about your business',
    isRequired: true,
    isCompleted: false,
    canSkip: false,
  },
  {
    id: 'loan',
    title: 'Loan Details',
    description: 'Loan amount, purpose, and terms',
    isRequired: true,
    isCompleted: false,
    canSkip: false,
  },
  {
    id: 'financial',
    title: 'Financial Information',
    description: 'Income, expenses, assets, and liabilities',
    isRequired: true,
    isCompleted: false,
    canSkip: false,
  },
  {
    id: 'documents',
    title: 'Document Upload',
    description: 'Supporting documents and verification',
    isRequired: true,
    isCompleted: false,
    canSkip: false,
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your application before submission',
    isRequired: true,
    isCompleted: false,
    canSkip: false,
  },
];

const STORAGE_KEY = 'aagt_loan_application';

export const useApplicationWizard = () => {
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {},
    businessInfo: {},
    loanDetails: {},
    financialInfo: {},
    documents: {},
    currentStep: 0,
    isCompleted: false,
    status: 'draft',
  });

  const [steps, setSteps] = useState<ApplicationStep[]>(APPLICATION_STEPS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveError, setLastSaveError] = useState<string | null>(null);

  // Load saved application data on mount
  useEffect(() => {
    const savedData = loadSavedApplication();
    if (savedData) {
      setApplicationData(savedData);
      updateStepCompletion(savedData);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (applicationData.currentStep > 0) {
        saveApplicationLocally();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [applicationData]);

  const loadSavedApplication = (): ApplicationData | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as ApplicationData;
        // Check if data is recent (within 7 days)
        if (data.lastSavedAt) {
          const saveDate = new Date(data.lastSavedAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          
          if (saveDate > weekAgo) {
            return data;
          }
        }
      }
    } catch (error) {
      console.error('Error loading saved application:', error);
    }
    return null;
  };

  const saveApplicationLocally = useCallback(() => {
    try {
      const dataToSave = {
        ...applicationData,
        lastSavedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      setLastSaveError(null);
    } catch (error) {
      console.error('Error saving application locally:', error);
      setLastSaveError('Failed to save progress locally');
    }
  }, [applicationData]);

  const clearSavedApplication = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing saved application:', error);
    }
  }, []);

  const updateStepCompletion = (data: ApplicationData) => {
    setSteps(prevSteps =>
      prevSteps.map((step, index) => ({
        ...step,
        isCompleted: index < data.currentStep || validateStep(step.id, data).isValid,
      }))
    );
  };

  const validateStep = (stepId: string, data: ApplicationData): StepValidationResult => {
    const errors: Array<{ field: string; message: string; type: 'required' | 'format' | 'min' | 'max' | 'custom' }> = [];

    switch (stepId) {
      case 'personal':
        if (!data.personalInfo.firstName) errors.push({ field: 'firstName', message: 'First name is required', type: 'required' });
        if (!data.personalInfo.lastName) errors.push({ field: 'lastName', message: 'Last name is required', type: 'required' });
        if (!data.personalInfo.email) errors.push({ field: 'email', message: 'Email is required', type: 'required' });
        if (!data.personalInfo.phone) errors.push({ field: 'phone', message: 'Phone is required', type: 'required' });
        break;

      case 'business':
        if (!data.businessInfo.businessName) errors.push({ field: 'businessName', message: 'Business name is required', type: 'required' });
        if (!data.businessInfo.abn) errors.push({ field: 'abn', message: 'ABN is required', type: 'required' });
        if (!data.businessInfo.businessType) errors.push({ field: 'businessType', message: 'Business type is required', type: 'required' });
        break;

      case 'loan':
        if (!data.loanDetails.amount || data.loanDetails.amount < 150000) {
          errors.push({ field: 'amount', message: 'Minimum loan amount is $150,000', type: 'min' });
        }
        if (data.loanDetails.amount && data.loanDetails.amount > 5000000) {
          errors.push({ field: 'amount', message: 'Maximum loan amount is $5,000,000', type: 'max' });
        }
        if (!data.loanDetails.purpose) errors.push({ field: 'purpose', message: 'Loan purpose is required', type: 'required' });
        break;

      case 'financial':
        if (!data.financialInfo.annualIncome) errors.push({ field: 'annualIncome', message: 'Annual income is required', type: 'required' });
        if (!data.financialInfo.bankDetails?.bsb) errors.push({ field: 'bsb', message: 'BSB is required', type: 'required' });
        break;

      case 'documents':
        const requiredDocs = ['identityDocuments', 'financialStatements', 'bankStatements'];
        for (const docType of requiredDocs) {
          const docs = data.documents[docType as keyof typeof data.documents] as any[];
          if (!docs || docs.length === 0) {
            errors.push({ field: docType, message: `${docType.replace(/([A-Z])/g, ' $1').toLowerCase()} required`, type: 'required' });
          }
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const updateStepData = useCallback((stepId: string, data: Partial<ApplicationData>) => {
    setApplicationData(prev => {
      const updated = { ...prev, ...data };
      updateStepCompletion(updated);
      return updated;
    });
    saveApplicationLocally();
  }, [saveApplicationLocally]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setApplicationData(prev => ({
        ...prev,
        currentStep: stepIndex,
      }));
    }
  }, [steps.length]);

  const nextStep = useCallback(() => {
    const currentStepId = steps[applicationData.currentStep]?.id;
    const validation = validateStep(currentStepId, applicationData);
    
    if (validation.isValid && applicationData.currentStep < steps.length - 1) {
      goToStep(applicationData.currentStep + 1);
      return true;
    }
    return false;
  }, [applicationData, steps, goToStep]);

  const prevStep = useCallback(() => {
    if (applicationData.currentStep > 0) {
      goToStep(applicationData.currentStep - 1);
      return true;
    }
    return false;
  }, [applicationData.currentStep, goToStep]);

  const submitApplication = useCallback(async () => {
    setIsLoading(true);
    try {
      // Validate all steps
      let isValid = true;
      for (const step of steps) {
        const validation = validateStep(step.id, applicationData);
        if (!validation.isValid) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        throw new Error('Please complete all required fields');
      }

      // Submit to API
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...applicationData,
          submittedAt: new Date().toISOString(),
          status: 'submitted',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      
      // Clear saved data on successful submission
      clearSavedApplication();
      
      setApplicationData(prev => ({
        ...prev,
        isCompleted: true,
        status: 'submitted',
        id: result.applicationId,
      }));

      return result;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [applicationData, steps, clearSavedApplication]);

  const getProgress = (): FormProgress => {
    const completedSteps = steps.map((_, index) => index).filter(index => 
      index < applicationData.currentStep || steps[index].isCompleted
    );

    return {
      currentStep: applicationData.currentStep,
      totalSteps: steps.length,
      completedSteps,
      canProceed: applicationData.currentStep < steps.length - 1,
      canGoBack: applicationData.currentStep > 0,
    };
  };

  const getCurrentStepValidation = (): StepValidationResult => {
    const currentStepId = steps[applicationData.currentStep]?.id;
    return validateStep(currentStepId, applicationData);
  };

  return {
    applicationData,
    steps,
    isLoading,
    lastSaveError,
    updateStepData,
    goToStep,
    nextStep,
    prevStep,
    submitApplication,
    getProgress,
    getCurrentStepValidation,
    validateStep,
    saveApplicationLocally,
    clearSavedApplication,
  };
};