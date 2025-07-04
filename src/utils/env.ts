// Environment variables with type safety and validation
export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Application URLs
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://aagtprivateloans.com.au',

  // SEO & Analytics
  GOOGLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  FB_VERIFICATION: process.env.NEXT_PUBLIC_FB_VERIFICATION,
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,

  // PostHog Analytics
  POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',

  // Email Configuration
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  FROM_EMAIL: process.env.FROM_EMAIL || 'info@aagtprivateloans.com.au',
  TO_EMAIL: process.env.TO_EMAIL || 'info@aagtprivateloans.com.au',

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // API Keys
  CREDIT_CHECK_API_KEY: process.env.CREDIT_CHECK_API_KEY,
  BUSINESS_REGISTRY_API_KEY: process.env.BUSINESS_REGISTRY_API_KEY,
  PROPERTY_VALUATION_API_KEY: process.env.PROPERTY_VALUATION_API_KEY,

  // Security
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  // Rate Limiting
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10),

  // Feature Flags
  FEATURE_CALCULATOR_ADVANCED: process.env.FEATURE_CALCULATOR_ADVANCED === 'true',
  FEATURE_ELIGIBILITY_CHECK: process.env.FEATURE_ELIGIBILITY_CHECK === 'true',
  FEATURE_DOCUMENT_UPLOAD: process.env.FEATURE_DOCUMENT_UPLOAD === 'true',
  FEATURE_LIVE_CHAT: process.env.FEATURE_LIVE_CHAT === 'true',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',

  // Application Settings
  MAX_LOAN_AMOUNT: parseInt(process.env.MAX_LOAN_AMOUNT || '5000000', 10),
  MIN_LOAN_AMOUNT: parseInt(process.env.MIN_LOAN_AMOUNT || '150000', 10),
  DEFAULT_INTEREST_RATE: parseFloat(process.env.DEFAULT_INTEREST_RATE || '8.5'),
  MAX_LOAN_TERM: parseInt(process.env.MAX_LOAN_TERM || '300', 10),

  // Contact Information
  COMPANY_PHONE: process.env.COMPANY_PHONE || '+61-2-9999-9999',
  COMPANY_EMAIL: process.env.COMPANY_EMAIL || 'info@aagtprivateloans.com.au',
  COMPANY_ADDRESS: process.env.COMPANY_ADDRESS || 'Level 1, 123 Business Street, Sydney NSW 2000',

  // Social Media
  LINKEDIN_URL: process.env.LINKEDIN_URL || 'https://linkedin.com/company/aagt-private-loans',
  TWITTER_URL: process.env.TWITTER_URL || 'https://twitter.com/AAGTLoans',
} as const;

// Type-safe environment variable getter
export function getEnvVar(key: keyof typeof env): string | number | boolean | undefined {
  return env[key];
}

// Validation function for required environment variables
export function validateEnv() {
  const required = ['APP_URL', 'SITE_URL', 'FROM_EMAIL', 'TO_EMAIL'] as const;

  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Feature flag helpers
export const features = {
  isCalculatorAdvanced: () => env.FEATURE_CALCULATOR_ADVANCED,
  isEligibilityCheckEnabled: () => env.FEATURE_ELIGIBILITY_CHECK,
  isDocumentUploadEnabled: () => env.FEATURE_DOCUMENT_UPLOAD,
  isLiveChatEnabled: () => env.FEATURE_LIVE_CHAT,
  isAnalyticsEnabled: () => env.ENABLE_ANALYTICS,
} as const;
