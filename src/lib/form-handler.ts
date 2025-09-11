// Form submission handler for GitHub Pages compatibility

const isStaticExport =
  process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' ||
  (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export interface FormSubmitOptions {
  endpoint: string;
  data: any;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  // Force a specific submission path regardless of environment
  // - 'auto': default behavior (use Web3Forms on static/no API, otherwise API)
  // - 'web3forms': always submit via Web3Forms
  // - 'api': always submit via API endpoint
  mode?: 'auto' | 'web3forms' | 'api';
}

export async function submitForm({ endpoint, data, onSuccess, onError, mode = 'auto' }: FormSubmitOptions) {
  console.log('Form handler - isStaticExport:', isStaticExport);
  console.log('Form handler - apiUrl:', apiUrl);
  console.log('Form handler - hostname:', typeof window !== 'undefined' ? window.location.hostname : 'server');
  
  // Determine which path to use
  const useWeb3Forms = mode === 'web3forms' || (mode === 'auto' && (isStaticExport || !apiUrl));

  // If running on GitHub Pages or a static context without API, or forced, use Web3Forms
  if (useWeb3Forms) {
    // Allow providing the Web3Forms key via submitted data (hidden input) or env
    const providedKey = (data && (data.access_key || data.accessKey)) as string | undefined;
    const effectiveKey = providedKey || web3formsKey;
    if (!effectiveKey) {
      const msg = 'Missing Web3Forms access key. Provide as hidden input `access_key` or set NEXT_PUBLIC_WEB3FORMS_KEY.';
      console.error(msg);
      onError?.(msg);
      throw new Error(msg);
    }

    console.log('Using Web3Forms for form submission');
    const endpointUrl = 'https://api.web3forms.com/submit';

    // Build a flat payload: Web3Forms accepts arbitrary fields
    const payload: Record<string, any> = {
      access_key: effectiveKey,
      from_name: 'AAGT Private Loans Website',
      from_email: data.email || undefined,
      subject:
        data._form === 'contact'
          ? `New Contact Message - ${data.name || data.email || 'Website'}`
          : `New Loan Application - ${data.firstName || ''} ${data.lastName || ''}`.trim(),
      // useful metadata
      page: typeof window !== 'undefined' ? window.location.href : undefined,
      // honey pot (empty means human)
      botcheck: '',
    };

    // Merge user data as-is so it appears in the email
    for (const [k, v] of Object.entries(data || {})) {
      payload[k] = v;
    }

    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result?.success) {
        const message =
          data._form === 'contact'
            ? 'Thanks for reaching out! We will get back to you within 24 hours.'
            : 'Thank you for your loan application! A lending specialist will contact you within 4 business hours.';
        onSuccess?.({ success: true, message, isDemo: false });
        return { success: true, message, isDemo: false };
      }
      throw new Error(result?.message || 'Form submission failed');
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Submission failed';
      onError?.(err);
      throw e;
    }
  }

  // Use external API if configured or forced
  console.log('Using API route for form submission, endpoint:', endpoint);
  const url = apiUrl ? `${apiUrl}${endpoint}` : endpoint;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      if (onSuccess) onSuccess(result);
      return result;
    } else {
      const errorMessage = result.error || 'Submission failed. Please try again.';
      if (onError) onError(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error. Please try again.';
    if (onError) onError(errorMessage);
    throw error;
  }
}

// File upload handler
export async function uploadFile(file: File, category: string): Promise<{
  success: boolean;
  file?: {
    id: string;
    originalName: string;
    filename: string;
    size: number;
    mimetype: string;
    category: string;
    uploadedAt: string;
    url: string;
  };
  isDemo?: boolean;
  message?: string;
}> {
  if (isStaticExport && !apiUrl) {
    // Simulate file upload for demo
    return {
      success: true,
      file: {
        id: Math.random().toString(36).substring(2, 11),
        originalName: file.name,
        filename: file.name,
        size: file.size,
        mimetype: file.type,
        category,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file),
      },
      isDemo: true,
      message: 'File stored locally for demo. In production, files are securely uploaded to our servers.',
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  const url = apiUrl ? `${apiUrl}/api/upload-document` : '/api/upload-document';

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}
