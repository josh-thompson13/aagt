import { type NextRequest, NextResponse } from 'next/server';

interface EligibilityRequest {
  loanAmount: number;
  annualIncome: number;
  creditScore?: number;
  businessAge?: number;
  industryType?: string;
  collateralValue?: number;
}

interface EligibilityResponse {
  eligible: boolean;
  confidence: 'high' | 'medium' | 'low';
  estimatedRate?: number;
  maxLoanAmount?: number;
  requiredDocuments: string[];
  nextSteps: string[];
  reasons?: string[];
}

function assessEligibility(request: EligibilityRequest): EligibilityResponse {
  const { loanAmount, annualIncome, creditScore, businessAge, collateralValue } = request;
  
  const reasons: string[] = [];
  let eligible = true;
  let confidence: 'high' | 'medium' | 'low' = 'high';
  let estimatedRate = 8.5; // Base rate

  // Basic eligibility checks
  if (loanAmount < 150000) {
    eligible = false;
    reasons.push('Minimum loan amount is $150,000');
  }

  if (loanAmount > 5000000) {
    eligible = false;
    reasons.push('Maximum loan amount is $5,000,000');
  }

  if (annualIncome < loanAmount * 0.2) {
    confidence = 'low';
    reasons.push('Annual income may be insufficient for requested loan amount');
    estimatedRate += 1.5;
  }

  // Credit score adjustments
  if (creditScore) {
    if (creditScore < 500) {
      eligible = false;
      reasons.push('Credit score below minimum threshold');
    } else if (creditScore < 650) {
      confidence = 'low';
      estimatedRate += 2;
      reasons.push('Credit score may require additional documentation');
    } else if (creditScore > 750) {
      estimatedRate -= 0.5;
    }
  }

  // Business age considerations
  if (businessAge !== undefined) {
    if (businessAge < 1) {
      confidence = 'low';
      estimatedRate += 1;
      reasons.push('New businesses require additional assessment');
    } else if (businessAge >= 5) {
      estimatedRate -= 0.25;
    }
  }

  // Collateral assessment
  if (collateralValue) {
    const lvr = loanAmount / collateralValue;
    if (lvr > 0.7) {
      confidence = confidence === 'high' ? 'medium' : 'low';
      estimatedRate += 0.5;
      reasons.push('High loan-to-value ratio may require additional security');
    } else if (lvr < 0.5) {
      estimatedRate -= 0.25;
    }
  }

  const requiredDocuments = [
    'Financial statements (last 2 years)',
    'Business Activity Statements',
    'Bank statements (6 months)',
    'Tax returns (last 2 years)',
  ];

  if (creditScore && creditScore < 650) {
    requiredDocuments.push('Credit report explanation');
    requiredDocuments.push('Character references');
  }

  if (collateralValue) {
    requiredDocuments.push('Valuation report');
    requiredDocuments.push('Certificate of title');
  }

  const nextSteps = eligible 
    ? [
        'Complete full application form',
        'Submit required documentation',
        'Schedule assessment call',
        'Await approval decision',
      ]
    : [
        'Review eligibility requirements',
        'Improve financial position if needed',
        'Consider alternative loan products',
        'Contact our lending specialists',
      ];

  return {
    eligible,
    confidence,
    estimatedRate: eligible ? Math.round(estimatedRate * 100) / 100 : undefined,
    maxLoanAmount: Math.min(5000000, annualIncome * 5),
    requiredDocuments,
    nextSteps,
    reasons: reasons.length > 0 ? reasons : undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: EligibilityRequest = await request.json();
    const { loanAmount, annualIncome } = body;

    // Basic validation
    if (!loanAmount || !annualIncome) {
      return NextResponse.json(
        { error: 'Missing required fields: loanAmount, annualIncome' },
        { status: 400 }
      );
    }

    if (loanAmount <= 0 || annualIncome <= 0) {
      return NextResponse.json(
        { error: 'Loan amount and annual income must be positive numbers' },
        { status: 400 }
      );
    }

    const assessment = assessEligibility(body);

    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Eligibility assessment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Eligibility Assessment API',
      description: 'Assess loan eligibility and get estimated terms',
      parameters: {
        loanAmount: 'Required. Requested loan amount',
        annualIncome: 'Required. Annual business income',
        creditScore: 'Optional. Credit score (300-850)',
        businessAge: 'Optional. Business age in years',
        industryType: 'Optional. Industry category',
        collateralValue: 'Optional. Value of collateral offered',
      },
      response: {
        eligible: 'Boolean eligibility status',
        confidence: 'Confidence level (high/medium/low)',
        estimatedRate: 'Estimated interest rate percentage',
        maxLoanAmount: 'Maximum loan amount qualified for',
        requiredDocuments: 'List of required documentation',
        nextSteps: 'Recommended next steps',
        reasons: 'Explanation for decision (if applicable)',
      },
    },
    { status: 200 }
  );
}