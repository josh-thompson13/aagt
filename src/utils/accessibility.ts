// WCAG 2.1 AA accessibility utilities and helpers

// Focus management utilities
export const focusManagement = {
  // Trap focus within a container (for modals, dropdowns)
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to a previous element
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  // Get the currently focused element
  getCurrentFocus: (): HTMLElement | null => {
    return document.activeElement as HTMLElement;
  },
};

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation for lists/grids
  handleArrowKeys: (
    e: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' | 'both' = 'vertical'
  ): number => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        break;
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
    }

    if (newIndex !== currentIndex && items[newIndex]) {
      items[newIndex]?.focus();
    }

    return newIndex;
  },

  // Handle escape key to close modals/dropdowns
  handleEscape: (callback: () => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  },
};

// ARIA utilities
export const aria = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string = 'aria'): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Set ARIA attributes safely
  setAttributes: (element: HTMLElement, attributes: Record<string, string>) => {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value) {
        element.setAttribute(key, value);
      } else {
        element.removeAttribute(key);
      }
    });
  },

  // Announce content to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Update live region content
  updateLiveRegion: (regionId: string, content: string) => {
    const region = document.getElementById(regionId);
    if (region) {
      region.textContent = content;
    }
  },
};

// Color contrast utilities
export const colorContrast = {
  // Calculate relative luminance
  relativeLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }) as [number, number, number];
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio between two colors
  contrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const l1 = colorContrast.relativeLuminance(...color1);
    const l2 = colorContrast.relativeLuminance(...color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG standards
  meetsWCAG: (
    color1: [number, number, number],
    color2: [number, number, number],
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean => {
    const ratio = colorContrast.contrastRatio(color1, color2);

    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7;
    } else {
      return size === 'large' ? ratio >= 3 : ratio >= 4.5;
    }
  },
};

// Form accessibility utilities
export const formAccessibility = {
  // Associate label with form control
  associateLabel: (labelElement: HTMLElement, controlElement: HTMLElement) => {
    const controlId = controlElement.id || aria.generateId('control');
    controlElement.id = controlId;
    labelElement.setAttribute('for', controlId);
  },

  // Add error message association
  associateError: (controlElement: HTMLElement, errorElement: HTMLElement) => {
    const errorId = errorElement.id || aria.generateId('error');
    errorElement.id = errorId;

    const describedBy = controlElement.getAttribute('aria-describedby');
    const newDescribedBy = describedBy ? `${describedBy} ${errorId}` : errorId;

    controlElement.setAttribute('aria-describedby', newDescribedBy);
    controlElement.setAttribute('aria-invalid', 'true');
  },

  // Remove error message association
  removeErrorAssociation: (controlElement: HTMLElement, errorId: string) => {
    const describedBy = controlElement.getAttribute('aria-describedby');
    if (describedBy) {
      const newDescribedBy = describedBy
        .split(' ')
        .filter((id) => id !== errorId)
        .join(' ');

      if (newDescribedBy) {
        controlElement.setAttribute('aria-describedby', newDescribedBy);
      } else {
        controlElement.removeAttribute('aria-describedby');
      }
    }
    controlElement.setAttribute('aria-invalid', 'false');
  },

  // Validate form accessibility
  validateFormAccessibility: (formElement: HTMLFormElement): string[] => {
    const issues: string[] = [];

    // Check for labels
    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const hasLabel =
        input.getAttribute('aria-label') ||
        input.getAttribute('aria-labelledby') ||
        formElement.querySelector(`label[for="${input.id}"]`);

      if (!hasLabel) {
        issues.push(
          `Form control missing accessible label: ${input.tagName}${input.id ? `#${input.id}` : ''}`
        );
      }
    });

    // Check for required field indicators
    const requiredInputs = formElement.querySelectorAll('[required]');
    requiredInputs.forEach((input) => {
      const hasRequiredIndicator =
        input.getAttribute('aria-required') === 'true' || input.getAttribute('aria-describedby');

      if (!hasRequiredIndicator) {
        issues.push(
          `Required field missing accessible indicator: ${input.tagName}${input.id ? `#${input.id}` : ''}`
        );
      }
    });

    return issues;
  },
};

// Screen reader utilities
export const screenReader = {
  // Create screen reader only text
  createSROnlyText: (text: string): HTMLElement => {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  },

  // Add screen reader description
  addDescription: (element: HTMLElement, description: string) => {
    const descriptionElement = screenReader.createSROnlyText(description);
    const descriptionId = aria.generateId('description');
    descriptionElement.id = descriptionId;

    element.appendChild(descriptionElement);

    const describedBy = element.getAttribute('aria-describedby');
    const newDescribedBy = describedBy ? `${describedBy} ${descriptionId}` : descriptionId;

    element.setAttribute('aria-describedby', newDescribedBy);
  },
};

// Reduced motion utilities
export const reducedMotion = {
  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Apply animation only if motion is not reduced
  conditionalAnimation: (_element: HTMLElement, animation: () => void, fallback?: () => void) => {
    if (reducedMotion.prefersReducedMotion()) {
      fallback?.();
    } else {
      animation();
    }
  },
};

// Touch accessibility
export const touchAccessibility = {
  // Ensure minimum touch target size (44x44px)
  ensureMinimumTouchTarget: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const minSize = 44;

    if (rect.width < minSize || rect.height < minSize) {
      element.style.minWidth = `${minSize}px`;
      element.style.minHeight = `${minSize}px`;
      element.style.display = 'inline-flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
    }
  },
};

// Export a comprehensive accessibility checker
export const accessibilityChecker = {
  // Run all accessibility checks on an element
  checkElement: (element: HTMLElement): string[] => {
    const issues: string[] = [];

    // Check color contrast (basic implementation)
    const style = getComputedStyle(element);
    const hasGoodContrast = style.color && style.backgroundColor;
    if (!hasGoodContrast) {
      issues.push('Element may not have sufficient color contrast');
    }

    // Check for alt text on images
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      issues.push('Image missing alt text');
    }

    // Check for accessible form controls
    if (element.tagName === 'FORM') {
      issues.push(...formAccessibility.validateFormAccessibility(element as HTMLFormElement));
    }

    // Check for minimum touch target size on interactive elements
    const isInteractive = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
    if (isInteractive) {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        issues.push('Interactive element below minimum touch target size (44x44px)');
      }
    }

    return issues;
  },

  // Generate accessibility report for the entire page
  generateReport: (): { issues: string[]; recommendations: string[] } => {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for page title
    if (!document.title) {
      issues.push('Page missing title');
    }

    // Check for main landmark
    if (!document.querySelector('main')) {
      issues.push('Page missing main landmark');
    }

    // Check for heading hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let currentLevel = 0;

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > currentLevel + 1) {
        issues.push(`Heading level skip detected: ${heading.tagName} after h${currentLevel}`);
      }
      currentLevel = level;
    });

    // General recommendations
    recommendations.push('Ensure all interactive elements are keyboard accessible');
    recommendations.push('Test with screen readers');
    recommendations.push('Verify color contrast meets WCAG 2.1 AA standards');
    recommendations.push('Test with users who have disabilities');

    return { issues, recommendations };
  },
};
