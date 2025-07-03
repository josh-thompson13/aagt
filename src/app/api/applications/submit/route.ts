import { NextRequest, NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';
import type { ApplicationData, ApplicationSubmissionResult } from '@/types/application';
import { validateApplication } from '@/utils/validation';

// Rate limiting for submissions
const submissionAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_SUBMISSIONS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempts = submissionAttempts.get(identifier);
  
  if (!attempts) {
    submissionAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset counter if window has passed
  if (now - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
    submissionAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Check if under limit
  if (attempts.count < MAX_SUBMISSIONS_PER_HOUR) {
    attempts.count++;
    attempts.lastAttempt = now;
    return true;
  }
  
  return false;
}

// Fraud detection (basic implementation)
function detectFraud(applicationData: ApplicationData): { isFraudulent: boolean; reason?: string } {
  // Check for suspicious patterns
  const suspiciousPatterns = [
    // Unrealistic loan amounts relative to income
    {
      check: () => {
        const loanAmount = applicationData.loanDetails.amount || 0;
        const annualIncome = applicationData.financialInfo.annualIncome || 0;
        return loanAmount > annualIncome * 10; // More than 10x annual income
      },
      reason: 'Loan amount significantly exceeds income capacity'
    },
    
    // Suspicious email patterns
    {
      check: () => {
        const email = applicationData.personalInfo.email || '';
        return /^[a-z]+\d+@(gmail|yahoo|outlook)\.com$/i.test(email);
      },
      reason: 'Email pattern suggests automated generation'
    },
    
    // Very new business with high loan amount
    {
      check: () => {
        const establishedDate = applicationData.businessInfo.establishedDate;
        const loanAmount = applicationData.loanDetails.amount || 0;
        if (!establishedDate) return false;
        
        const businessAge = (Date.now() - new Date(establishedDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
        return businessAge < 0.5 && loanAmount > 500000; // Less than 6 months old, loan > $500k
      },
      reason: 'Very new business requesting large loan amount'
    }
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.check()) {
      return { isFraudulent: true, reason: pattern.reason };
    }
  }
  
  return { isFraudulent: false };
}

// Credit score simulation
async function simulateCreditCheck(applicationData: ApplicationData): Promise<{
  score: number;
  risk: 'low' | 'medium' | 'high';
  factors: string[];
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a realistic credit score based on application data
  let baseScore = 650;
  const factors: string[] = [];
  
  // Business age factor
  const establishedDate = applicationData.businessInfo.establishedDate;
  if (establishedDate) {
    const businessAge = (Date.now() - new Date(establishedDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
    if (businessAge > 5) {
      baseScore += 50;
      factors.push('Established business history');
    } else if (businessAge < 1) {
      baseScore -= 30;
      factors.push('New business');
    }
  }
  
  // Income vs loan amount ratio
  const loanAmount = applicationData.loanDetails.amount || 0;
  const annualIncome = applicationData.financialInfo.annualIncome || 0;
  if (annualIncome > 0) {
    const ratio = loanAmount / annualIncome;
    if (ratio < 2) {
      baseScore += 30;
      factors.push('Conservative loan-to-income ratio');
    } else if (ratio > 5) {
      baseScore -= 40;
      factors.push('High loan-to-income ratio');
    }
  }
  
  // Security offered
  if (applicationData.loanDetails.securityOffered) {
    baseScore += 25;
    factors.push('Security offered');
  }
  
  // Add some randomness
  baseScore += Math.random() * 40 - 20;
  
  // Clamp to realistic range
  const score = Math.max(300, Math.min(850, Math.round(baseScore)));
  
  let risk: 'low' | 'medium' | 'high';
  if (score >= 700) risk = 'low';
  else if (score >= 600) risk = 'medium';
  else risk = 'high';
  
  return { score, risk, factors };
}

// Generate interest rate based on risk assessment
function calculateInterestRate(creditScore: number, risk: string, loanDetails: any): number {
  let baseRate = 8.5; // Default rate
  
  // Adjust based on credit score
  if (creditScore >= 750) baseRate -= 1.0;
  else if (creditScore >= 700) baseRate -= 0.5;
  else if (creditScore < 600) baseRate += 1.5;
  else if (creditScore < 550) baseRate += 2.5;
  
  // Adjust based on loan purpose
  switch (loanDetails.purpose) {
    case 'business_expansion':
      baseRate -= 0.25;
      break;
    case 'debt_consolidation':
      baseRate += 0.5;
      break;
    case 'investment_property':
      baseRate -= 0.1;
      break;
  }
  
  // Adjust based on security
  if (loanDetails.securityOffered) {
    baseRate -= 0.5;
  }
  
  return Math.round(baseRate * 100) / 100;
}

export async function POST(request: NextRequest) {
  try {
    const applicationData: ApplicationData = await request.json();
    
    if (!applicationData) {
      return NextResponse.json(
        { error: 'Application data is required' },
        { status: 400 }
      );
    }

    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const identifier = applicationData.personalInfo.email || clientIP;
    
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: 'Too many submission attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate application data
    const validation = validateApplication(applicationData);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        message: 'Application validation failed',
        errors: validation.errors,
      } as ApplicationSubmissionResult);
    }

    // Fraud detection
    const fraudCheck = detectFraud(applicationData);
    if (fraudCheck.isFraudulent) {
      // Log potential fraud
      console.warn('Potential fraud detected:', {
        email: applicationData.personalInfo.email,
        reason: fraudCheck.reason,
        timestamp: new Date().toISOString(),
      });
      
      // Return generic error to not reveal fraud detection
      return NextResponse.json(
        { error: 'Application could not be processed at this time. Please contact support.' },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `APP${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // Perform credit check simulation
    const creditAssessment = await simulateCreditCheck(applicationData);
    
    // Calculate interest rate
    const interestRate = calculateInterestRate(
      creditAssessment.score,
      creditAssessment.risk,
      applicationData.loanDetails
    );

    // Determine initial decision based on risk assessment
    let status: 'approved' | 'rejected' | 'under_review';
    let message: string;
    let nextSteps: string[];

    if (creditAssessment.score >= 700 && creditAssessment.risk === 'low') {
      status = 'approved';
      message = 'Congratulations! Your loan application has been approved in principle.';
      nextSteps = [
        'You will receive a formal loan offer within 2 business days',
        'Please prepare final documentation as requested',
        'A loan specialist will contact you to finalize terms',
        'Funds can be settled within 4 business days of acceptance',
      ];
    } else if (creditAssessment.score < 500 || creditAssessment.risk === 'high') {
      status = 'rejected';
      message = 'Unfortunately, we are unable to approve your loan application at this time.';
      nextSteps = [
        'You will receive detailed feedback within 24 hours',
        'Consider improving your credit profile and reapplying in 6 months',
        'Speak with our financial advisors about alternative options',
        'Review our business development resources',
      ];
    } else {
      status = 'under_review';
      message = 'Your application is under review by our lending team.';
      nextSteps = [
        'Additional documentation may be requested',
        'A decision will be made within 5 business days',
        'Our team may contact you for clarification',
        'You will be notified via email and phone',
      ];
    }

    // Prepare final application data
    const finalApplicationData: ApplicationData = {
      ...applicationData,
      id: applicationId,
      status,
      submittedAt: new Date().toISOString(),
      isCompleted: true,
    };

    // Save to database via the save endpoint
    const saveResponse = await fetch(new URL('/api/applications/save', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalApplicationData),
    });

    if (!saveResponse.ok) {
      throw new Error('Failed to save application');
    }

    // Log submission for analytics
    console.log('Application submitted:', {
      applicationId,
      email: applicationData.personalInfo.email,
      loanAmount: applicationData.loanDetails.amount,
      creditScore: creditAssessment.score,
      risk: creditAssessment.risk,
      interestRate,
      status,
      timestamp: new Date().toISOString(),
    });

    const result: ApplicationSubmissionResult = {
      success: true,
      applicationId,
      message,
      nextSteps,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Application submission error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing your application. Please try again.',
      errors: [{ field: 'general', message: 'System error', type: 'custom' }],
    } as ApplicationSubmissionResult, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Application Submission API',
      description: 'Submit completed loan applications for processing',
      endpoint: 'POST /api/applications/submit',
      features: [
        'Full application validation',
        'Fraud detection',
        'Credit assessment simulation',
        'Rate limiting',
        'CRM integration',
        'Email notifications',
      ],
    },
    { status: 200 }
  );
}