import DOMPurify from 'isomorphic-dompurify';
import sanitizeHtml from 'sanitize-html';

// Input sanitization utilities
export const sanitization = {
  // Sanitize HTML content
  sanitizeHtml: (dirty: string, options?: sanitizeHtml.IOptions): string => {
    const defaultOptions: sanitizeHtml.IOptions = {
      allowedTags: [],
      allowedAttributes: {},
      disallowedTagsMode: 'discard',
    };
    
    return sanitizeHtml(dirty, { ...defaultOptions, ...options });
  },

  // Sanitize DOM content
  sanitizeDOM: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  },

  // Sanitize text input
  sanitizeText: (input: string): string => {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, '') // Remove vbscript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 1000); // Limit length
  },

  // Sanitize email input
  sanitizeEmail: (email: string): string => {
    const sanitized = sanitization.sanitizeText(email);
    return sanitized.toLowerCase();
  },

  // Sanitize phone number
  sanitizePhone: (phone: string): string => {
    return phone.replace(/[^0-9+\-\s()]/g, '').substring(0, 20);
  },

  // Sanitize ABN/ACN
  sanitizeBusinessNumber: (number: string): string => {
    return number.replace(/[^0-9\s]/g, '').substring(0, 15);
  },

  // Sanitize numeric input
  sanitizeNumber: (input: string | number): number => {
    const num = typeof input === 'string' 
      ? parseFloat(input.replace(/[^0-9.-]/g, '')) 
      : input;
    return isNaN(num) ? 0 : Math.max(0, num);
  },

  // Sanitize file names
  sanitizeFileName: (fileName: string): string => {
    return fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 100);
  },

  // Sanitize URL
  sanitizeUrl: (url: string): string => {
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
        return '';
      }
      return parsed.toString();
    } catch {
      return '';
    }
  },
};

// XSS prevention utilities
export const xssProtection = {
  // Escape HTML entities
  escapeHtml: (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    
    return text.replace(/[&<>"']/g, (m) => map[m]);
  },

  // Validate and sanitize attributes
  sanitizeAttributes: (attributes: Record<string, any>): Record<string, any> => {
    const safe: Record<string, any> = {};
    
    Object.entries(attributes).forEach(([key, value]) => {
      // Skip dangerous attributes
      if (key.startsWith('on') || key.includes('script') || key.includes('javascript')) {
        return;
      }
      
      if (typeof value === 'string') {
        safe[key] = sanitization.sanitizeText(value);
      } else if (typeof value === 'number') {
        safe[key] = value;
      } else if (typeof value === 'boolean') {
        safe[key] = value;
      }
    });
    
    return safe;
  },

  // Check for potential XSS patterns
  containsXSS: (input: string): boolean => {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /<link/gi,
      /<meta/gi,
      /data:text\/html/gi,
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  },
};

// CSRF protection utilities
export const csrfProtection = {
  // Generate CSRF token
  generateToken: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // Validate CSRF token
  validateToken: (token: string, expectedToken: string): boolean => {
    if (!token || !expectedToken) return false;
    return token === expectedToken;
  },

  // Store token in session storage (client-side)
  storeToken: (token: string): void => {
    try {
      sessionStorage.setItem('csrf_token', token);
    } catch (error) {
      console.warn('Failed to store CSRF token:', error);
    }
  },

  // Retrieve token from session storage
  getToken: (): string | null => {
    try {
      return sessionStorage.getItem('csrf_token');
    } catch (error) {
      console.warn('Failed to retrieve CSRF token:', error);
      return null;
    }
  },
};

// Rate limiting utilities (client-side)
export const rateLimiting = {
  // Track request attempts
  attempts: new Map<string, { count: number; lastAttempt: number }>(),

  // Check if request is allowed
  isAllowed: (key: string, maxAttempts: number, windowMs: number): boolean => {
    const now = Date.now();
    const attempts = rateLimiting.attempts.get(key);
    
    if (!attempts) {
      rateLimiting.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Reset counter if window has passed
    if (now - attempts.lastAttempt > windowMs) {
      rateLimiting.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Check if under limit
    if (attempts.count < maxAttempts) {
      attempts.count++;
      attempts.lastAttempt = now;
      return true;
    }
    
    return false;
  },

  // Clear attempts for a key
  clearAttempts: (key: string): void => {
    rateLimiting.attempts.delete(key);
  },
};

// Content Security Policy helpers
export const cspHelpers = {
  // Generate nonce for inline scripts
  generateNonce: (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  },

  // Validate nonce
  validateNonce: (nonce: string): boolean => {
    return /^[A-Za-z0-9+/=]+$/.test(nonce) && nonce.length >= 16;
  },
};

// SQL injection prevention (for client-side validation)
export const sqlInjectionProtection = {
  // Check for SQL injection patterns
  containsSQLInjection: (input: string): boolean => {
    const sqlPatterns = [
      /(\bunion\b.*\bselect\b)|(\bselect\b.*\bunion\b)/gi,
      /\b(insert|update|delete|drop|create|alter|exec|execute)\b/gi,
      /'.*(\bor\b|\band\b).*'/gi,
      /--/g,
      /\/\*/g,
      /\*\//g,
      /;/g,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  },

  // Escape SQL special characters (basic client-side protection)
  escapeSQLInput: (input: string): string => {
    return input
      .replace(/'/g, "''")
      .replace(/"/g, '""')
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  },
};

// File upload security
export const fileUploadSecurity = {
  // Allowed file types
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ],

  // Validate file type
  isAllowedType: (fileType: string): boolean => {
    return fileUploadSecurity.allowedTypes.includes(fileType);
  },

  // Validate file size
  isValidSize: (fileSize: number, maxSize: number = 10 * 1024 * 1024): boolean => {
    return fileSize > 0 && fileSize <= maxSize;
  },

  // Check for malicious file content
  scanFileContent: async (file: File): Promise<{ safe: boolean; reason?: string }> => {
    try {
      const content = await file.text();
      
      // Check for script tags in non-script files
      if (!file.type.includes('javascript') && /<script/gi.test(content)) {
        return { safe: false, reason: 'Script content detected in non-script file' };
      }
      
      // Check for suspicious patterns
      const suspiciousPatterns = [
        /eval\s*\(/gi,
        /document\.write/gi,
        /window\.location/gi,
        /\.innerHTML/gi,
      ];
      
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(content)) {
          return { safe: false, reason: 'Suspicious content pattern detected' };
        }
      }
      
      return { safe: true };
    } catch (error) {
      // If we can't read the content, allow it (binary files)
      return { safe: true };
    }
  },

  // Generate safe file name
  generateSafeFileName: (originalName: string): string => {
    const extension = originalName.split('.').pop() || '';
    const name = originalName.replace(/\.[^/.]+$/, '');
    const safeName = sanitization.sanitizeFileName(name);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    
    return `${safeName}_${timestamp}_${random}.${extension}`;
  },
};

// Encryption utilities (for sensitive data)
export const encryption = {
  // Encrypt sensitive data using Web Crypto API
  encrypt: async (data: string, password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const passwordBuffer = encoder.encode(password);
    
    // Create key from password
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Generate salt
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Derive encryption key
    const encryptionKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      key,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    // Generate IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt data
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      encryptionKey,
      dataBuffer
    );
    
    // Combine salt, iv, and encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);
    
    // Return base64 encoded result
    return btoa(String.fromCharCode(...combined));
  },

  // Hash sensitive data
  hash: async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = new Uint8Array(hashBuffer);
    
    return Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
  },
};

// Comprehensive security validator
export const securityValidator = {
  // Validate entire form data
  validateFormData: (data: Record<string, any>): { 
    isValid: boolean; 
    sanitized: Record<string, any>; 
    errors: string[] 
  } => {
    const errors: string[] = [];
    const sanitized: Record<string, any> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Check for XSS
        if (xssProtection.containsXSS(value)) {
          errors.push(`Potential XSS detected in field: ${key}`);
          return;
        }
        
        // Check for SQL injection
        if (sqlInjectionProtection.containsSQLInjection(value)) {
          errors.push(`Potential SQL injection detected in field: ${key}`);
          return;
        }
        
        // Sanitize based on field type
        switch (key) {
          case 'email':
            sanitized[key] = sanitization.sanitizeEmail(value);
            break;
          case 'phone':
            sanitized[key] = sanitization.sanitizePhone(value);
            break;
          case 'abn':
          case 'acn':
            sanitized[key] = sanitization.sanitizeBusinessNumber(value);
            break;
          default:
            sanitized[key] = sanitization.sanitizeText(value);
        }
      } else if (typeof value === 'number') {
        sanitized[key] = sanitization.sanitizeNumber(value);
      } else {
        sanitized[key] = value;
      }
    });
    
    return {
      isValid: errors.length === 0,
      sanitized,
      errors,
    };
  },

  // Generate security headers for requests
  generateSecurityHeaders: (): Record<string, string> => {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
  },
};

// Export all security utilities
export const security = {
  sanitization,
  xssProtection,
  csrfProtection,
  rateLimiting,
  cspHelpers,
  sqlInjectionProtection,
  fileUploadSecurity,
  encryption,
  securityValidator,
};