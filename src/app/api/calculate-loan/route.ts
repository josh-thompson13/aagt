import { type NextRequest, NextResponse } from 'next/server';

interface LoanRequest {
  amount: number;
  rate: number;
  term: number;
}

interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule?: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number,
  includeSchedule = false
): LoanCalculation {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = principal * (monthlyRate * (1 + monthlyRate) ** termMonths) / 
    ((1 + monthlyRate) ** termMonths - 1);
  
  const totalAmount = monthlyPayment * termMonths;
  const totalInterest = totalAmount - principal;

  const result: LoanCalculation = {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };

  if (includeSchedule) {
    result.amortizationSchedule = [];
    let balance = principal;

    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      result.amortizationSchedule.push({
        month,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.max(0, Math.round(balance * 100) / 100),
      });
    }
  }

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoanRequest = await request.json();
    const { amount, rate, term } = body;

    // Validation
    if (!amount || !rate || !term) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, rate, term' },
        { status: 400 }
      );
    }

    if (amount < 150000 || amount > 5000000) {
      return NextResponse.json(
        { error: 'Loan amount must be between $150,000 and $5,000,000' },
        { status: 400 }
      );
    }

    if (rate < 0.1 || rate > 50) {
      return NextResponse.json(
        { error: 'Interest rate must be between 0.1% and 50%' },
        { status: 400 }
      );
    }

    if (term < 1 || term > 300) {
      return NextResponse.json(
        { error: 'Term must be between 1 and 300 months' },
        { status: 400 }
      );
    }

    const includeSchedule = request.nextUrl.searchParams.get('schedule') === 'true';
    const calculation = calculateLoan(amount, rate, term, includeSchedule);

    return NextResponse.json(calculation);
  } catch (error) {
    console.error('Loan calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Loan Calculator API',
      endpoints: {
        'POST /api/calculate-loan': 'Calculate loan payments',
        'POST /api/calculate-loan?schedule=true': 'Calculate with amortization schedule',
      },
      parameters: {
        amount: 'Loan amount (150,000 - 5,000,000)',
        rate: 'Annual interest rate percentage (0.1 - 50)',
        term: 'Loan term in months (1 - 300)',
      },
    },
    { status: 200 }
  );
}