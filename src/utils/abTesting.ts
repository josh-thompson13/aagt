import type { ABTestVariant } from '@/types/calculator';

export class ABTestingEngine {
  private static STORAGE_KEY = 'aagt_ab_test_assignments';
  
  private static variants: ABTestVariant[] = [
    {
      id: 'original',
      name: 'Original Calculator',
      description: 'Standard 3-step calculator flow',
      isActive: true,
      trafficPercentage: 50
    },
    {
      id: 'simplified',
      name: 'Simplified Calculator',
      description: 'Single-step calculator with instant results',
      isActive: true,
      trafficPercentage: 25
    },
    {
      id: 'enhanced',
      name: 'Enhanced Calculator',
      description: 'Calculator with advanced features and extra comparisons',
      isActive: true,
      trafficPercentage: 25
    }
  ];

  static getVariantForUser(userId?: string): ABTestVariant {
    // Check if user already has an assignment
    const stored = ABTestingEngine.getStoredAssignment();
    if (stored) {
      const variant = ABTestingEngine.variants.find(v => v.id === stored.variantId);
      if (variant?.isActive) {
        return variant;
      }
    }

    // Assign new variant based on traffic distribution
    const activeVariants = ABTestingEngine.variants.filter(v => v.isActive);
    const totalPercentage = activeVariants.reduce((sum, v) => sum + v.trafficPercentage, 0);
    
    if (totalPercentage === 0) {
      return ABTestingEngine.variants[0]; // Fallback to original
    }

    // Use user ID for consistent assignment, or random for anonymous users
    const seed = userId ? ABTestingEngine.hashString(userId) : Math.random();
    const normalizedSeed = seed * totalPercentage;
    
    let cumulativePercentage = 0;
    for (const variant of activeVariants) {
      cumulativePercentage += variant.trafficPercentage;
      if (normalizedSeed <= cumulativePercentage) {
        // Store assignment
        ABTestingEngine.storeAssignment(variant.id);
        return variant;
      }
    }

    // Fallback
    return activeVariants[0];
  }

  static trackEvent(event: string, variant: ABTestVariant, properties?: Record<string, any>) {
    // In a real implementation, this would send to your analytics service
    console.log('AB Test Event:', {
      event,
      variant: variant.id,
      timestamp: new Date().toISOString(),
      properties
    });

    // Example: Send to PostHog, Mixpanel, or your analytics service
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(event, {
        ab_test_variant: variant.id,
        ab_test_name: variant.name,
        ...properties
      });
    }
  }

  static trackCalculatorStep(step: number, variant: ABTestVariant) {
    ABTestingEngine.trackEvent('calculator_step_completed', variant, { step });
  }

  static trackCalculatorCompletion(variant: ABTestVariant, timeToComplete: number) {
    ABTestingEngine.trackEvent('calculator_completed', variant, { 
      timeToComplete,
      conversion: true
    });
  }

  static trackCalculatorAbandonment(step: number, variant: ABTestVariant, timeOnStep: number) {
    ABTestingEngine.trackEvent('calculator_abandoned', variant, { 
      abandonedAtStep: step,
      timeOnStep
    });
  }

  static trackLeadGeneration(variant: ABTestVariant, source: 'save' | 'share' | 'apply') {
    ABTestingEngine.trackEvent('lead_generated', variant, { source });
  }

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize to 0-1
  }

  private static storeAssignment(variantId: string) {
    if (typeof window === 'undefined') return;
    
    const assignment = {
      variantId,
      timestamp: Date.now(),
      sessionId: ABTestingEngine.generateSessionId()
    };
    
    localStorage.setItem(ABTestingEngine.STORAGE_KEY, JSON.stringify(assignment));
  }

  private static getStoredAssignment(): { variantId: string; timestamp: number; sessionId: string } | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(ABTestingEngine.STORAGE_KEY);
      if (stored) {
        const assignment = JSON.parse(stored);
        // Check if assignment is less than 30 days old
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (Date.now() - assignment.timestamp < thirtyDays) {
          return assignment;
        }
      }
    } catch (error) {
      console.error('Error reading AB test assignment:', error);
    }
    
    return null;
  }

  private static generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Admin methods for managing variants
  static updateVariant(variantId: string, updates: Partial<ABTestVariant>) {
    const index = ABTestingEngine.variants.findIndex(v => v.id === variantId);
    if (index !== -1) {
      ABTestingEngine.variants[index] = { ...ABTestingEngine.variants[index], ...updates };
    }
  }

  static getVariantStats(): { variant: ABTestVariant; assignments: number }[] {
    // In a real implementation, this would query your analytics database
    // For demo purposes, return mock data
    return ABTestingEngine.variants.map(variant => ({
      variant,
      assignments: Math.floor(Math.random() * 1000) + 100
    }));
  }

  static calculateConversionRates(): { 
    variantId: string; 
    views: number; 
    completions: number; 
    conversionRate: number 
  }[] {
    // In a real implementation, this would calculate from actual data
    return ABTestingEngine.variants.map(variant => {
      const views = Math.floor(Math.random() * 1000) + 500;
      const completions = Math.floor(views * (0.15 + Math.random() * 0.1)); // 15-25% conversion
      return {
        variantId: variant.id,
        views,
        completions,
        conversionRate: (completions / views) * 100
      };
    });
  }
}

// React hook for using AB testing in components
export function useABTest(testName: string, userId?: string) {
  const variant = ABTestingEngine.getVariantForUser(userId);
  
  const track = (event: string, properties?: Record<string, any>) => {
    ABTestingEngine.trackEvent(event, variant, properties);
  };

  return {
    variant,
    track,
    isVariant: (variantId: string) => variant.id === variantId
  };
}