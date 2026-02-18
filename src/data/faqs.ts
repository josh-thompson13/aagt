import type { FAQItem } from '@/types/content';

export const faqs: FAQItem[] = [
  // Loan Basics
  {
    id: 'loan-amounts',
    question: 'What loan amounts do you offer?',
    answer:
      'We provide loans from $150,000 to $10,000,000 for various business and investment purposes. Our flexible approach means we can tailor loan amounts to your specific needs and security position.',
    category: 'Loan Basics',
    tags: ['loan amount', 'limits', 'minimum', 'maximum'],
    helpful: 87,
    notHelpful: 3,
    lastUpdated: '2024-01-15',
    featured: true,
    relatedQuestions: ['interest-rates', 'security-requirements', 'approval-time'],
  },
  {
    id: 'interest-rates',
    question: 'What are your interest rates?',
    answer:
      'Our interest rates start from 8.95% p.a. for business loans and 9.25% p.a. for investment loans. Rates vary based on loan amount, term, security type, and borrower profile. We provide competitive rates with transparent pricing and no hidden fees.',
    category: 'Loan Basics',
    tags: ['interest rates', 'pricing', 'comparison', 'fees'],
    helpful: 94,
    notHelpful: 6,
    lastUpdated: '2024-01-15',
    featured: true,
    relatedQuestions: ['loan-amounts', 'fees-charges', 'rate-comparison'],
  },
  {
    id: 'loan-terms',
    question: 'What loan terms are available?',
    answer:
      'We offer flexible loan terms from 1 month to 25 years, depending on the loan type and purpose. Business expansion loans can be up to 25 years, while bridging finance is typically 1-24 months. We work with you to find terms that suit your cash flow and business needs.',
    category: 'Loan Basics',
    tags: ['loan terms', 'repayment', 'flexibility', 'duration'],
    helpful: 76,
    notHelpful: 4,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['repayment-options', 'early-repayment', 'interest-only'],
  },

  // Application Process
  {
    id: 'approval-time',
    question: 'How quickly can I get approved?',
    answer:
      'We offer same-day approval for most loan applications. Our streamlined process and direct decision-making means you can receive approval within 24 hours of submitting a complete application. Settlement typically occurs within 4 business days of approval.',
    category: 'Application Process',
    tags: ['approval time', 'fast approval', 'same day', 'quick'],
    helpful: 156,
    notHelpful: 2,
    lastUpdated: '2024-01-15',
    featured: true,
    relatedQuestions: ['documentation-required', 'application-process', 'settlement-time'],
  },
  {
    id: 'documentation-required',
    question: 'What documentation do I need to provide?',
    answer:
      'We require minimal documentation compared to traditional lenders. Typically this includes: financial statements (2 years), tax returns, bank statements (6 months), business plan, and asset valuations. Our lending specialists will provide a complete checklist based on your specific loan type.',
    category: 'Application Process',
    tags: ['documentation', 'requirements', 'paperwork', 'application'],
    helpful: 82,
    notHelpful: 8,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['approval-time', 'eligibility-criteria', 'application-process'],
  },
  {
    id: 'application-process',
    question: 'What is the application process?',
    answer:
      'Our application process is simple: 1) Submit an enquiry online or call us, 2) Complete the application with required documents, 3) We assess and approve (usually same day), 4) Legal documentation and settlement (4 days). Our team guides you through each step.',
    category: 'Application Process',
    tags: ['application process', 'steps', 'procedure', 'how to apply'],
    helpful: 91,
    notHelpful: 5,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['approval-time', 'documentation-required', 'settlement-time'],
  },

  // Eligibility & Requirements
  {
    id: 'eligibility-criteria',
    question: 'What are the eligibility criteria?',
    answer:
      'Key eligibility criteria include: Australian business registration, minimum 2 years trading history (1 year for some products), annual turnover typically $500k+, acceptable credit history, and suitable security. We assess each application individually and can be flexible with unique circumstances.',
    category: 'Eligibility & Requirements',
    tags: ['eligibility', 'criteria', 'requirements', 'qualify'],
    helpful: 73,
    notHelpful: 12,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['security-requirements', 'credit-requirements', 'business-requirements'],
  },
  {
    id: 'security-requirements',
    question: 'What security do you accept?',
    answer:
      'We accept various forms of security including commercial property, residential property, business assets, equipment, and personal guarantees. Security requirements depend on loan amount and purpose. We can often work with what you have available.',
    category: 'Eligibility & Requirements',
    tags: ['security', 'collateral', 'property', 'assets'],
    helpful: 88,
    notHelpful: 7,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['eligibility-criteria', 'lvr-requirements', 'valuation-process'],
  },
  {
    id: 'credit-requirements',
    question: 'Do you lend to people with poor credit?',
    answer:
      'We consider applications from borrowers with less-than-perfect credit. As a private lender, we focus on the overall deal including security, serviceability, and business viability rather than just credit scores. Each application is assessed on its merits.',
    category: 'Eligibility & Requirements',
    tags: ['credit score', 'poor credit', 'bad credit', 'credit history'],
    helpful: 134,
    notHelpful: 18,
    lastUpdated: '2024-01-15',
    featured: true,
    relatedQuestions: ['eligibility-criteria', 'security-requirements', 'individual-assessment'],
  },

  // Fees & Costs
  {
    id: 'fees-charges',
    question: 'What fees and charges apply?',
    answer:
      'Our fee structure is transparent: establishment fee of 1% (max $5,000), no ongoing monthly fees, and no early exit fees. Additional costs may include valuation, legal fees, and government charges, all disclosed upfront. No hidden fees or surprise charges.',
    category: 'Fees & Costs',
    tags: ['fees', 'charges', 'costs', 'transparent pricing'],
    helpful: 96,
    notHelpful: 4,
    lastUpdated: '2024-01-15',
    featured: true,
    relatedQuestions: ['interest-rates', 'comparison-rates', 'hidden-fees'],
  },
  {
    id: 'hidden-fees',
    question: 'Are there any hidden fees?',
    answer:
      "No, we have no hidden fees. All costs are disclosed upfront including establishment fees, legal costs, valuation fees, and government charges. We believe in transparent pricing so you know exactly what you'll pay before proceeding.",
    category: 'Fees & Costs',
    tags: ['hidden fees', 'transparent', 'no surprises', 'disclosure'],
    helpful: 112,
    notHelpful: 2,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['fees-charges', 'comparison-rates', 'total-cost'],
  },

  // Repayment & Terms
  {
    id: 'repayment-options',
    question: 'What repayment options are available?',
    answer:
      'We offer flexible repayment options including principal and interest, interest-only periods, and customized payment schedules to match your cash flow. Payments can be monthly, quarterly, or other arrangements that suit your business cycle.',
    category: 'Repayment & Terms',
    tags: ['repayment', 'payment options', 'flexibility', 'cash flow'],
    helpful: 79,
    notHelpful: 6,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['interest-only', 'early-repayment', 'payment-schedules'],
  },
  {
    id: 'early-repayment',
    question: 'Can I repay my loan early?',
    answer:
      'Yes, you can repay your loan early without penalty fees on most of our products. This flexibility allows you to save on interest costs when your cash flow improves or you secure alternative funding. Early repayment terms are clearly outlined in your loan agreement.',
    category: 'Repayment & Terms',
    tags: ['early repayment', 'no penalty', 'flexibility', 'save interest'],
    helpful: 87,
    notHelpful: 3,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['repayment-options', 'fees-charges', 'loan-terms'],
  },
  {
    id: 'interest-only',
    question: 'Do you offer interest-only payments?',
    answer:
      'Yes, we offer interest-only payment options for many of our loan products. This can help with cash flow management, especially during business development phases or seasonal variations. Interest-only terms are available for agreed periods within the overall loan term.',
    category: 'Repayment & Terms',
    tags: ['interest only', 'cash flow', 'payment flexibility', 'business development'],
    helpful: 84,
    notHelpful: 7,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['repayment-options', 'cash-flow-solutions', 'loan-terms'],
  },

  // Comparison & Advantages
  {
    id: 'bank-comparison',
    question: 'How do you compare to banks?',
    answer:
      'While banks may offer slightly lower rates, we provide significant advantages: same-day approval vs 10-14 days, 4-day settlement vs 30-45 days, minimal documentation, no committee delays, and flexible security options. We focus on speed, service, and certainty.',
    category: 'Comparison & Advantages',
    tags: ['bank comparison', 'advantages', 'speed', 'service'],
    helpful: 143,
    notHelpful: 11,
    lastUpdated: '2024-01-15',
    featured: true,
    relatedQuestions: ['approval-time', 'private-lender-benefits', 'why-choose-aagt'],
  },
  {
    id: 'private-lender-benefits',
    question: 'What are the benefits of using a private lender?',
    answer:
      "Private lenders offer speed, flexibility, and personalized service. Benefits include faster approval and settlement, flexible lending criteria, direct decision-making, customized loan structures, and the ability to consider unique circumstances that banks often can't accommodate.",
    category: 'Comparison & Advantages',
    tags: ['private lender', 'benefits', 'flexibility', 'personalized service'],
    helpful: 98,
    notHelpful: 8,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['bank-comparison', 'why-choose-aagt', 'flexibility-advantages'],
  },

  // Investment & Property
  {
    id: 'investment-property-loans',
    question: 'Do you provide investment property loans?',
    answer:
      'Yes, we specialize in investment property loans with competitive rates from 9.25% p.a. We offer up to 75% LVR, interest-only options, and can consider portfolio lending for experienced investors. Our expertise includes residential, commercial, and development properties.',
    category: 'Investment & Property',
    tags: ['investment property', 'property loans', 'portfolio lending', 'LVR'],
    helpful: 89,
    notHelpful: 6,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['lvr-requirements', 'property-types', 'portfolio-lending'],
  },
  {
    id: 'off-the-plan-finance',
    question: 'Do you provide off-the-plan finance?',
    answer:
      'Yes, we provide specialized off-the-plan finance with sunset clause protection, progress payment funding, and flexible settlement terms. We understand the unique risks and requirements of off-the-plan purchases and structure finance accordingly.',
    category: 'Investment & Property',
    tags: ['off the plan', 'development finance', 'sunset clause', 'progress payments'],
    helpful: 67,
    notHelpful: 4,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['investment-property-loans', 'development-finance', 'construction-loans'],
  },

  // Business Loans
  {
    id: 'business-loan-purposes',
    question: 'What can I use a business loan for?',
    answer:
      "Our business loans can be used for expansion, equipment purchase, working capital, debt consolidation, inventory, marketing campaigns, hiring staff, premises fit-out, technology upgrades, or any legitimate business purpose. We're flexible with how you use the funds.",
    category: 'Business Loans',
    tags: ['business loan purposes', 'expansion', 'equipment', 'working capital'],
    helpful: 92,
    notHelpful: 3,
    lastUpdated: '2024-01-15',
    featured: false,
    relatedQuestions: ['business-requirements', 'working-capital', 'equipment-finance'],
  },

];

export const faqCategories = [
  {
    id: 'loan-basics',
    name: 'Loan Basics',
    description: 'Essential information about our loan products',
    icon: '💡',
  },
  {
    id: 'application-process',
    name: 'Application Process',
    description: 'How to apply and what to expect',
    icon: '📋',
  },
  {
    id: 'eligibility-requirements',
    name: 'Eligibility & Requirements',
    description: 'Who can apply and what we need',
    icon: '✅',
  },
  {
    id: 'fees-costs',
    name: 'Fees & Costs',
    description: 'Transparent pricing and fee structure',
    icon: '💰',
  },
  {
    id: 'repayment-terms',
    name: 'Repayment & Terms',
    description: 'Payment options and loan terms',
    icon: '📅',
  },
  {
    id: 'comparison-advantages',
    name: 'Comparison & Advantages',
    description: 'How we compare to other lenders',
    icon: '🏆',
  },
  {
    id: 'investment-property',
    name: 'Investment & Property',
    description: 'Property and investment lending',
    icon: '🏘️',
  },
  {
    id: 'business-loans',
    name: 'Business Loans',
    description: 'Business funding and expansion',
    icon: '🏢',
  },
];

export const featuredFAQs = faqs.filter((faq) => faq.featured);
export const popularFAQs = faqs.sort((a, b) => b.helpful - a.helpful).slice(0, 10);
