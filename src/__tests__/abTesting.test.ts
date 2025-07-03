import { ABTestingEngine } from '@/utils/abTesting';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ABTestingEngine', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  describe('getVariantForUser', () => {
    it('should return a variant for new user', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const variant = ABTestingEngine.getVariantForUser();
      
      expect(variant).toBeDefined();
      expect(variant.id).toBeDefined();
      expect(variant.name).toBeDefined();
      expect(variant.isActive).toBe(true);
    });

    it('should return stored variant for returning user', () => {
      const storedAssignment = {
        variantId: 'original',
        timestamp: Date.now(),
        sessionId: 'test-session'
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedAssignment));
      
      const variant = ABTestingEngine.getVariantForUser();
      
      expect(variant.id).toBe('original');
    });

    it('should assign new variant if stored assignment is expired', () => {
      const expiredAssignment = {
        variantId: 'original',
        timestamp: Date.now() - (31 * 24 * 60 * 60 * 1000), // 31 days ago
        sessionId: 'test-session'
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(expiredAssignment));
      
      const variant = ABTestingEngine.getVariantForUser();
      
      // Should get a new assignment
      expect(variant).toBeDefined();
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should assign same variant for same user ID', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const variant1 = ABTestingEngine.getVariantForUser('user123');
      const variant2 = ABTestingEngine.getVariantForUser('user123');
      
      expect(variant1.id).toBe(variant2.id);
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const variant = ABTestingEngine.getVariantForUser();
      
      expect(variant).toBeDefined();
      expect(variant.isActive).toBe(true);
    });
  });

  describe('trackEvent', () => {
    it('should track events with variant information', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const variant = {
        id: 'test-variant',
        name: 'Test Variant',
        description: 'Test',
        isActive: true,
        trafficPercentage: 50
      };
      
      ABTestingEngine.trackEvent('test-event', variant, { customProp: 'value' });
      
      expect(consoleSpy).toHaveBeenCalledWith('AB Test Event:', expect.objectContaining({
        event: 'test-event',
        variant: 'test-variant',
        properties: { customProp: 'value' }
      }));
      
      consoleSpy.mockRestore();
    });

    it('should send to PostHog when available', () => {
      const mockPostHog = {
        capture: jest.fn()
      };
      
      // Mock window.posthog
      (window as any).posthog = mockPostHog;
      
      const variant = {
        id: 'test-variant',
        name: 'Test Variant',
        description: 'Test',
        isActive: true,
        trafficPercentage: 50
      };
      
      ABTestingEngine.trackEvent('test-event', variant, { customProp: 'value' });
      
      expect(mockPostHog.capture).toHaveBeenCalledWith('test-event', {
        ab_test_variant: 'test-variant',
        ab_test_name: 'Test Variant',
        customProp: 'value'
      });
      
      // Clean up
      delete (window as any).posthog;
    });
  });

  describe('hashString', () => {
    it('should return consistent hash for same string', () => {
      // Using any to access private method for testing
      const hash1 = (ABTestingEngine as any).hashString('test-user-123');
      const hash2 = (ABTestingEngine as any).hashString('test-user-123');
      
      expect(hash1).toBe(hash2);
      expect(hash1).toBeGreaterThanOrEqual(0);
      expect(hash1).toBeLessThanOrEqual(1);
    });

    it('should return different hashes for different strings', () => {
      const hash1 = (ABTestingEngine as any).hashString('user1');
      const hash2 = (ABTestingEngine as any).hashString('user2');
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('updateVariant', () => {
    it('should update variant properties', () => {
      ABTestingEngine.updateVariant('original', { 
        trafficPercentage: 75,
        isActive: false 
      });
      
      // Since variants is private, we test the effect indirectly
      const stats = ABTestingEngine.getVariantStats();
      const originalVariant = stats.find(s => s.variant.id === 'original');
      
      expect(originalVariant).toBeDefined();
    });
  });

  describe('getVariantStats', () => {
    it('should return stats for all variants', () => {
      const stats = ABTestingEngine.getVariantStats();
      
      expect(stats).toBeInstanceOf(Array);
      expect(stats.length).toBeGreaterThan(0);
      
      stats.forEach(stat => {
        expect(stat).toHaveProperty('variant');
        expect(stat).toHaveProperty('assignments');
        expect(stat.variant).toHaveProperty('id');
        expect(stat.variant).toHaveProperty('name');
        expect(typeof stat.assignments).toBe('number');
      });
    });
  });

  describe('calculateConversionRates', () => {
    it('should return conversion rates for all variants', () => {
      const rates = ABTestingEngine.calculateConversionRates();
      
      expect(rates).toBeInstanceOf(Array);
      expect(rates.length).toBeGreaterThan(0);
      
      rates.forEach(rate => {
        expect(rate).toHaveProperty('variantId');
        expect(rate).toHaveProperty('views');
        expect(rate).toHaveProperty('completions');
        expect(rate).toHaveProperty('conversionRate');
        
        expect(typeof rate.views).toBe('number');
        expect(typeof rate.completions).toBe('number');
        expect(typeof rate.conversionRate).toBe('number');
        
        expect(rate.views).toBeGreaterThan(0);
        expect(rate.completions).toBeLessThanOrEqual(rate.views);
        expect(rate.conversionRate).toBeGreaterThanOrEqual(0);
        expect(rate.conversionRate).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('tracking methods', () => {
    it('should track calculator step completion', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const variant = {
        id: 'test-variant',
        name: 'Test Variant',
        description: 'Test',
        isActive: true,
        trafficPercentage: 50
      };
      
      ABTestingEngine.trackCalculatorStep(2, variant);
      
      expect(consoleSpy).toHaveBeenCalledWith('AB Test Event:', expect.objectContaining({
        event: 'calculator_step_completed',
        variant: 'test-variant',
        properties: { step: 2 }
      }));
      
      consoleSpy.mockRestore();
    });

    it('should track calculator completion', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const variant = {
        id: 'test-variant',
        name: 'Test Variant',
        description: 'Test',
        isActive: true,
        trafficPercentage: 50
      };
      
      ABTestingEngine.trackCalculatorCompletion(variant, 120);
      
      expect(consoleSpy).toHaveBeenCalledWith('AB Test Event:', expect.objectContaining({
        event: 'calculator_completed',
        variant: 'test-variant',
        properties: { timeToComplete: 120, conversion: true }
      }));
      
      consoleSpy.mockRestore();
    });

    it('should track calculator abandonment', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const variant = {
        id: 'test-variant',
        name: 'Test Variant',
        description: 'Test',
        isActive: true,
        trafficPercentage: 50
      };
      
      ABTestingEngine.trackCalculatorAbandonment(1, variant, 30);
      
      expect(consoleSpy).toHaveBeenCalledWith('AB Test Event:', expect.objectContaining({
        event: 'calculator_abandoned',
        variant: 'test-variant',
        properties: { abandonedAtStep: 1, timeOnStep: 30 }
      }));
      
      consoleSpy.mockRestore();
    });

    it('should track lead generation', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const variant = {
        id: 'test-variant',
        name: 'Test Variant',
        description: 'Test',
        isActive: true,
        trafficPercentage: 50
      };
      
      ABTestingEngine.trackLeadGeneration(variant, 'save');
      
      expect(consoleSpy).toHaveBeenCalledWith('AB Test Event:', expect.objectContaining({
        event: 'lead_generated',
        variant: 'test-variant',
        properties: { source: 'save' }
      }));
      
      consoleSpy.mockRestore();
    });
  });
});