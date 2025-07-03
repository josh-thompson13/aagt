'use client';

import { useEffect, useRef, useCallback } from 'react';
import { 
  focusManagement, 
  keyboardNavigation, 
  aria, 
  reducedMotion,
  touchAccessibility,
} from '@/utils/accessibility';

// Hook for focus management
export const useFocusManagement = () => {
  const previousFocus = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousFocus.current = focusManagement.getCurrentFocus();
  }, []);

  const restoreFocus = useCallback(() => {
    focusManagement.restoreFocus(previousFocus.current);
  }, []);

  const trapFocus = useCallback((container: HTMLElement) => {
    return focusManagement.trapFocus(container);
  }, []);

  return { saveFocus, restoreFocus, trapFocus };
};

// Hook for keyboard navigation
export const useKeyboardNavigation = (
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical' | 'both' = 'vertical'
) => {
  const currentIndex = useRef(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    currentIndex.current = keyboardNavigation.handleArrowKeys(
      e,
      items,
      currentIndex.current,
      orientation
    );
  }, [items, orientation]);

  const handleEscape = useCallback((callback: () => void) => {
    return keyboardNavigation.handleEscape(callback);
  }, []);

  return { handleKeyDown, handleEscape, currentIndex: currentIndex.current };
};

// Hook for ARIA announcements
export const useAnnouncements = () => {
  const announce = useCallback((
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    aria.announce(message, priority);
  }, []);

  const updateLiveRegion = useCallback((regionId: string, content: string) => {
    aria.updateLiveRegion(regionId, content);
  }, []);

  return { announce, updateLiveRegion };
};

// Hook for form accessibility
export const useFormAccessibility = () => {
  const associateLabel = useCallback((
    labelElement: HTMLElement, 
    controlElement: HTMLElement
  ) => {
    const controlId = controlElement.id || aria.generateId('control');
    controlElement.id = controlId;
    labelElement.setAttribute('for', controlId);
  }, []);

  const setFieldError = useCallback((
    fieldElement: HTMLElement,
    errorElement: HTMLElement,
    hasError: boolean
  ) => {
    if (hasError) {
      const errorId = errorElement.id || aria.generateId('error');
      errorElement.id = errorId;
      
      fieldElement.setAttribute('aria-invalid', 'true');
      fieldElement.setAttribute('aria-describedby', errorId);
    } else {
      fieldElement.setAttribute('aria-invalid', 'false');
      fieldElement.removeAttribute('aria-describedby');
    }
  }, []);

  const setRequired = useCallback((element: HTMLElement, required: boolean) => {
    if (required) {
      element.setAttribute('required', '');
      element.setAttribute('aria-required', 'true');
    } else {
      element.removeAttribute('required');
      element.removeAttribute('aria-required');
    }
  }, []);

  return { associateLabel, setFieldError, setRequired };
};

// Hook for reduced motion preferences
export const useReducedMotion = () => {
  const prefersReducedMotion = useCallback(() => {
    return reducedMotion.prefersReducedMotion();
  }, []);

  const conditionalAnimation = useCallback((
    animation: () => void,
    fallback?: () => void
  ) => {
    reducedMotion.conditionalAnimation(
      document.body, // placeholder element
      animation,
      fallback
    );
  }, []);

  return { prefersReducedMotion, conditionalAnimation };
};

// Hook for touch accessibility
export const useTouchAccessibility = () => {
  const ensureMinimumTouchTarget = useCallback((element: HTMLElement) => {
    touchAccessibility.ensureMinimumTouchTarget(element);
  }, []);

  // Auto-apply to refs
  const touchTargetRef = useCallback((element: HTMLElement | null) => {
    if (element) {
      ensureMinimumTouchTarget(element);
    }
  }, [ensureMinimumTouchTarget]);

  return { ensureMinimumTouchTarget, touchTargetRef };
};

// Hook for modal accessibility
export const useModalAccessibility = (isOpen: boolean) => {
  const modalRef = useRef<HTMLElement | null>(null);
  const { saveFocus, restoreFocus, trapFocus } = useFocusManagement();
  const { handleEscape } = useKeyboardNavigation([]);

  const openModal = useCallback((onClose: () => void) => {
    saveFocus();
    
    // Trap focus within modal
    if (modalRef.current) {
      const cleanup = trapFocus(modalRef.current);
      
      // Handle escape key
      const escapeCleanup = handleEscape(onClose);
      
      // Hide content from screen readers
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.setAttribute('aria-hidden', 'true');
      }

      return () => {
        cleanup();
        escapeCleanup();
        if (mainContent) {
          mainContent.removeAttribute('aria-hidden');
        }
      };
    }
  }, [saveFocus, trapFocus, handleEscape]);

  const closeModal = useCallback(() => {
    restoreFocus();
  }, [restoreFocus]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus first focusable element in modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  return { modalRef, openModal, closeModal };
};

// Hook for skip navigation
export const useSkipNavigation = () => {
  const skipToMain = useCallback(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    }
  }, []);

  const skipToContent = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  }, []);

  return { skipToMain, skipToContent };
};

// Hook for screen reader announcements on route changes
export const useRouteAnnouncements = () => {
  const { announce } = useAnnouncements();

  const announceRouteChange = useCallback((routeName: string) => {
    announce(`Navigated to ${routeName}`, 'polite');
  }, [announce]);

  const announcePageLoad = useCallback((pageTitle: string) => {
    announce(`${pageTitle} page loaded`, 'polite');
  }, [announce]);

  return { announceRouteChange, announcePageLoad };
};

// Hook for form validation announcements
export const useFormValidationAnnouncements = () => {
  const { announce } = useAnnouncements();

  const announceValidationResults = useCallback((
    isValid: boolean,
    errorCount: number,
    fieldName?: string
  ) => {
    if (fieldName) {
      if (isValid) {
        announce(`${fieldName} is valid`, 'polite');
      } else {
        announce(`${fieldName} has an error`, 'assertive');
      }
    } else {
      if (isValid) {
        announce('Form is valid', 'polite');
      } else {
        announce(`Form has ${errorCount} error${errorCount === 1 ? '' : 's'}`, 'assertive');
      }
    }
  }, [announce]);

  const announceFormSubmission = useCallback((status: 'submitting' | 'success' | 'error') => {
    const messages = {
      submitting: 'Form is being submitted',
      success: 'Form submitted successfully',
      error: 'Form submission failed',
    };
    
    announce(messages[status], status === 'error' ? 'assertive' : 'polite');
  }, [announce]);

  return { announceValidationResults, announceFormSubmission };
};

// Hook for document upload accessibility
export const useUploadAccessibility = () => {
  const { announce } = useAnnouncements();

  const announceUploadStatus = useCallback((
    fileName: string,
    status: 'uploading' | 'success' | 'error',
    progress?: number
  ) => {
    const messages = {
      uploading: `Uploading ${fileName}${progress ? ` - ${progress}% complete` : ''}`,
      success: `${fileName} uploaded successfully`,
      error: `Failed to upload ${fileName}`,
    };
    
    announce(messages[status], status === 'error' ? 'assertive' : 'polite');
  }, [announce]);

  const announceDropZoneStatus = useCallback((isDragActive: boolean) => {
    if (isDragActive) {
      announce('Files are ready to be dropped', 'polite');
    }
  }, [announce]);

  return { announceUploadStatus, announceDropZoneStatus };
};

// Comprehensive accessibility hook for the application
export const useApplicationAccessibility = () => {
  const announcements = useAnnouncements();
  const focusManagement = useFocusManagement();
  const formAccessibility = useFormAccessibility();
  const reducedMotion = useReducedMotion();
  const touchAccessibility = useTouchAccessibility();
  const skipNavigation = useSkipNavigation();

  // Initialize accessibility features on mount
  useEffect(() => {
    // Add skip link if not present
    const skipLink = document.getElementById('skip-to-main');
    if (!skipLink) {
      const link = document.createElement('a');
      link.id = 'skip-to-main';
      link.href = '#main-content';
      link.textContent = 'Skip to main content';
      link.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        skipNavigation.skipToMain();
      });
      document.body.insertBefore(link, document.body.firstChild);
    }

    // Add aria-live regions if not present
    const politeRegion = document.getElementById('aria-live-polite');
    if (!politeRegion) {
      const region = document.createElement('div');
      region.id = 'aria-live-polite';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
    }

    const assertiveRegion = document.getElementById('aria-live-assertive');
    if (!assertiveRegion) {
      const region = document.createElement('div');
      region.id = 'aria-live-assertive';
      region.setAttribute('aria-live', 'assertive');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
    }
  }, [skipNavigation]);

  return {
    ...announcements,
    ...focusManagement,
    ...formAccessibility,
    ...reducedMotion,
    ...touchAccessibility,
    ...skipNavigation,
  };
};