'use client';

import { useCallback, useEffect, useState } from 'react';
import { security } from '@/utils/security';

// Hook for CSRF protection
export const useCSRFProtection = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    // Generate or retrieve CSRF token on mount
    let token = security.csrfProtection.getToken();
    if (!token) {
      token = security.csrfProtection.generateToken();
      security.csrfProtection.storeToken(token);
    }
    setCsrfToken(token);
  }, []);

  const refreshToken = useCallback(() => {
    const newToken = security.csrfProtection.generateToken();
    security.csrfProtection.storeToken(newToken);
    setCsrfToken(newToken);
  }, []);

  const validateToken = useCallback((token: string) => {
    return security.csrfProtection.validateToken(token, csrfToken || '');
  }, [csrfToken]);

  return { csrfToken, refreshToken, validateToken };
};

// Hook for rate limiting
export const useRateLimit = (key: string, maxAttempts: number, windowMs: number) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);

  const checkLimit = useCallback(() => {
    const allowed = security.rateLimiting.isAllowed(key, maxAttempts, windowMs);
    setIsBlocked(!allowed);
    
    // Calculate attempts left
    const attempts = security.rateLimiting.attempts.get(key);
    const left = attempts ? Math.max(0, maxAttempts - attempts.count) : maxAttempts;
    setAttemptsLeft(left);
    
    return allowed;
  }, [key, maxAttempts, windowMs]);

  const resetLimit = useCallback(() => {
    security.rateLimiting.clearAttempts(key);
    setIsBlocked(false);
    setAttemptsLeft(maxAttempts);
  }, [key, maxAttempts]);

  return { isBlocked, attemptsLeft, checkLimit, resetLimit };
};

// Hook for secure form handling
export const useSecureForm = () => {
  const [securityErrors, setSecurityErrors] = useState<string[]>([]);

  const validateAndSanitize = useCallback((formData: Record<string, any>) => {
    const result = security.securityValidator.validateFormData(formData);
    setSecurityErrors(result.errors);
    return result;
  }, []);

  const sanitizeInput = useCallback((value: string, type: 'text' | 'email' | 'phone' | 'business') => {
    switch (type) {
      case 'email':
        return security.sanitization.sanitizeEmail(value);
      case 'phone':
        return security.sanitization.sanitizePhone(value);
      case 'business':
        return security.sanitization.sanitizeBusinessNumber(value);
      default:
        return security.sanitization.sanitizeText(value);
    }
  }, []);

  const checkForXSS = useCallback((input: string) => {
    return security.xssProtection.containsXSS(input);
  }, []);

  const checkForSQLInjection = useCallback((input: string) => {
    return security.sqlInjectionProtection.containsSQLInjection(input);
  }, []);

  return {
    securityErrors,
    validateAndSanitize,
    sanitizeInput,
    checkForXSS,
    checkForSQLInjection,
  };
};

// Hook for secure file uploads
export const useSecureFileUpload = () => {
  const [scanResults, setScanResults] = useState<Record<string, boolean>>({});

  const validateFile = useCallback(async (file: File): Promise<{
    isValid: boolean;
    errors: string[];
  }> => {
    const errors: string[] = [];

    // Check file type
    if (!security.fileUploadSecurity.isAllowedType(file.type)) {
      errors.push(`File type ${file.type} is not allowed`);
    }

    // Check file size
    if (!security.fileUploadSecurity.isValidSize(file.size)) {
      errors.push('File size exceeds maximum limit');
    }

    // Scan file content
    try {
      const scanResult = await security.fileUploadSecurity.scanFileContent(file);
      setScanResults(prev => ({ ...prev, [file.name]: scanResult.safe }));
      
      if (!scanResult.safe) {
        errors.push(scanResult.reason || 'File content is potentially dangerous');
      }
    } catch (error) {
      errors.push('Failed to scan file content');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  const generateSafeFileName = useCallback((originalName: string) => {
    return security.fileUploadSecurity.generateSafeFileName(originalName);
  }, []);

  return {
    validateFile,
    generateSafeFileName,
    scanResults,
  };
};

// Hook for secure API requests
export const useSecureAPI = () => {
  const { csrfToken } = useCSRFProtection();

  const createSecureRequest = useCallback((
    url: string,
    options: RequestInit = {}
  ): RequestInit => {
    const securityHeaders = security.securityValidator.generateSecurityHeaders();
    
    return {
      ...options,
      headers: {
        ...securityHeaders,
        ...options.headers,
        ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
      },
    };
  }, [csrfToken]);

  const securePost = useCallback(async (
    url: string,
    data: any,
    options: RequestInit = {}
  ) => {
    // Validate and sanitize data
    const validationResult = security.securityValidator.validateFormData(data);
    
    if (!validationResult.isValid) {
      throw new Error(`Security validation failed: ${validationResult.errors.join(', ')}`);
    }

    const secureOptions = createSecureRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationResult.sanitized),
      ...options,
    });

    return fetch(url, secureOptions);
  }, [createSecureRequest]);

  const secureGet = useCallback(async (
    url: string,
    options: RequestInit = {}
  ) => {
    const secureOptions = createSecureRequest(url, {
      method: 'GET',
      ...options,
    });

    return fetch(url, secureOptions);
  }, [createSecureRequest]);

  return {
    createSecureRequest,
    securePost,
    secureGet,
  };
};

// Hook for secure data encryption
export const useEncryption = () => {
  const encryptData = useCallback(async (data: string, password: string) => {
    try {
      return await security.encryption.encrypt(data, password);
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }, []);

  const hashData = useCallback(async (data: string) => {
    try {
      return await security.encryption.hash(data);
    } catch (error) {
      console.error('Hashing failed:', error);
      throw new Error('Failed to hash data');
    }
  }, []);

  return {
    encryptData,
    hashData,
  };
};

// Hook for input validation and sanitization
export const useInputSecurity = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateInput = useCallback((
    fieldName: string,
    value: string,
    type: 'text' | 'email' | 'phone' | 'business' | 'url' = 'text'
  ) => {
    const errors: string[] = [];

    // Check for XSS
    if (security.xssProtection.containsXSS(value)) {
      errors.push('Input contains potentially dangerous content');
    }

    // Check for SQL injection
    if (security.sqlInjectionProtection.containsSQLInjection(value)) {
      errors.push('Input contains potentially dangerous patterns');
    }

    // Type-specific validation
    switch (type) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push('Invalid email format');
        }
        break;
      case 'phone':
        if (value && !/^(\+?61|0)[2-9]\d{8}$/.test(value.replace(/\s/g, ''))) {
          errors.push('Invalid phone number format');
        }
        break;
      case 'url':
        try {
          if (value && !security.sanitization.sanitizeUrl(value)) {
            errors.push('Invalid or unsafe URL');
          }
        } catch {
          errors.push('Invalid URL format');
        }
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      [fieldName]: errors.length > 0 ? errors[0] : '',
    }));

    return errors.length === 0;
  }, []);

  const sanitizeInput = useCallback((
    value: string,
    type: 'text' | 'email' | 'phone' | 'business' | 'url' = 'text'
  ) => {
    switch (type) {
      case 'email':
        return security.sanitization.sanitizeEmail(value);
      case 'phone':
        return security.sanitization.sanitizePhone(value);
      case 'business':
        return security.sanitization.sanitizeBusinessNumber(value);
      case 'url':
        return security.sanitization.sanitizeUrl(value);
      default:
        return security.sanitization.sanitizeText(value);
    }
  }, []);

  const clearValidationError = useCallback((fieldName: string) => {
    setValidationErrors(prev => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  }, []);

  return {
    validateInput,
    sanitizeInput,
    clearValidationError,
    validationErrors,
  };
};

// Comprehensive security hook
export const useApplicationSecurity = () => {
  const csrf = useCSRFProtection();
  const secureForm = useSecureForm();
  const secureAPI = useSecureAPI();
  const fileUpload = useSecureFileUpload();
  const encryption = useEncryption();
  const inputSecurity = useInputSecurity();

  // Initialize security measures on mount
  useEffect(() => {
    // Set up global error handlers
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Don't expose internal errors to user
      event.preventDefault();
    });

    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
    });

    return () => {
      window.removeEventListener('unhandledrejection', () => {});
      window.removeEventListener('error', () => {});
    };
  }, []);

  return {
    csrf,
    secureForm,
    secureAPI,
    fileUpload,
    encryption,
    inputSecurity,
  };
};