import { NextResponse } from 'next/server';
import type { RateUpdateResponse } from '@/types/calculator';

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
let cachedRates: { data: RateUpdateResponse; timestamp: number } | null = null;

async function fetchLatestRates(): Promise<RateUpdateResponse> {
  // In a real implementation, this would fetch from your rate provider API
  // For now, we'll return static rates that could be updated from your backend
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const baseRates = {
    business: 8.95,
    investment: 9.25,
    property: 8.75,
    workingCapital: 9.45
  };
  
  // Add small random variations to simulate market changes
  const variation = () => (Math.random() - 0.5) * 0.1; // ±0.05%
  
  return {
    rates: {
      business: Math.round((baseRates.business + variation()) * 100) / 100,
      investment: Math.round((baseRates.investment + variation()) * 100) / 100,
      property: Math.round((baseRates.property + variation()) * 100) / 100,
      workingCapital: Math.round((baseRates.workingCapital + variation()) * 100) / 100
    },
    lastUpdated: new Date().toISOString(),
    comparisonRates: [
      {
        lender: 'AAGT Private Loans',
        rate: 8.95,
        fees: 1500,
        comparisonRate: 9.12,
        isAAGT: true
      },
      {
        lender: 'CBA Business',
        rate: 7.25,
        fees: 3500,
        comparisonRate: 7.58,
        isAAGT: false
      },
      {
        lender: 'ANZ Business',
        rate: 7.45,
        fees: 3200,
        comparisonRate: 7.74,
        isAAGT: false
      },
      {
        lender: 'NAB Business',
        rate: 7.35,
        fees: 3800,
        comparisonRate: 7.71,
        isAAGT: false
      },
      {
        lender: 'Westpac Business',
        rate: 7.55,
        fees: 3600,
        comparisonRate: 7.89,
        isAAGT: false
      }
    ]
  };
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';
    
    // Check cache
    const now = Date.now();
    if (!forceRefresh && cachedRates && (now - cachedRates.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cachedRates.data);
    }
    
    // Fetch fresh rates
    const rates = await fetchLatestRates();
    
    // Update cache
    cachedRates = {
      data: rates,
      timestamp: now
    };
    
    return NextResponse.json(rates);
    
  } catch (error) {
    console.error('Error fetching rates:', error);
    
    // Return fallback rates
    return NextResponse.json({
      rates: {
        business: 8.95,
        investment: 9.25,
        property: 8.75,
        workingCapital: 9.45
      },
      lastUpdated: new Date().toISOString(),
      comparisonRates: []
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { loanPurpose, loanAmount, securityType } = body;
    
    // Custom rate calculation based on loan parameters
    let baseRate = 8.95;
    
    switch (loanPurpose) {
      case 'business':
        baseRate = 8.95;
        break;
      case 'investment':
        baseRate = 9.25;
        break;
      case 'property':
        baseRate = 8.75;
        break;
      case 'working-capital':
        baseRate = 9.45;
        break;
    }
    
    // Adjust rate based on loan amount
    if (loanAmount >= 2000000) {
      baseRate -= 0.25; // Better rates for larger loans
    } else if (loanAmount >= 1000000) {
      baseRate -= 0.15;
    } else if (loanAmount >= 500000) {
      baseRate -= 0.05;
    }
    
    // Adjust rate based on security type
    switch (securityType) {
      case 'property':
        baseRate -= 0.1; // Better rates for property security
        break;
      case 'business-assets':
        baseRate += 0.05;
        break;
      case 'personal-guarantee':
        baseRate += 0.15;
        break;
      case 'other':
        baseRate += 0.25;
        break;
    }
    
    baseRate = Math.round(baseRate * 100) / 100;
    
    return NextResponse.json({
      customRate: baseRate,
      standardRate: 8.95,
      discount: 8.95 - baseRate,
      reasoning: {
        loanAmount: loanAmount >= 500000 ? 'Large loan discount applied' : 'Standard rate',
        securityType: securityType === 'property' ? 'Property security discount' : 'Risk adjustment applied'
      }
    });
    
  } catch (error) {
    console.error('Error calculating custom rate:', error);
    return NextResponse.json(
      { error: 'Failed to calculate custom rate' },
      { status: 500 }
    );
  }
}