export interface LoanProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'business' | 'investment' | 'property' | 'personal';
  minAmount: number;
  maxAmount: number;
  minRate: number;
  maxRate: number;
  minTerm: number;
  maxTerm: number;
  features: string[];
  requirements: string[];
  benefits: string[];
  eligibility: string[];
  fees: {
    establishment: number | string;
    ongoing: number | string;
    early_exit: number | string;
  };
  lvr?: {
    max: number;
    preferred: number;
  };
  turnaroundTime: {
    approval: string;
    settlement: string;
  };
  security: string[];
  documentation: string[];
  tags: string[];
  featured: boolean;
  popular: boolean;
  available: boolean;
  lastUpdated: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
  lastUpdated: string;
  featured: boolean;
  relatedQuestions: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  publishDate: string;
  lastModified: string;
  category: string;
  tags: string[];
  featured: boolean;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  schema?: {
    type: 'Article' | 'BlogPosting' | 'NewsArticle';
    headline: string;
    image: string;
    datePublished: string;
    dateModified: string;
  };
}

export interface LegalPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  lastUpdated: string;
  version: string;
  category: 'privacy' | 'terms' | 'compliance' | 'legal';
  requiredReview: boolean;
  reviewDate?: string;
  approvedBy?: string;
}

export interface ContentFilter {
  category?: string[];
  minAmount?: number;
  maxAmount?: number;
  minRate?: number;
  maxRate?: number;
  features?: string[];
  tags?: string[];
  available?: boolean;
  featured?: boolean;
  popular?: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'faq' | 'blog' | 'page';
  excerpt: string;
  url: string;
  score: number;
  highlights: string[];
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    type: string;
    image: string;
    url: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  schema?: Record<string, any>;
}
