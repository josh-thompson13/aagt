// Form submission handler for GitHub Pages compatibility

const isStaticExport = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface FormSubmitOptions {
  endpoint: string;
  data: any;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export async function submitForm({ endpoint, data, onSuccess, onError }: FormSubmitOptions) {
  // If running on GitHub Pages without external API
  if (isStaticExport && !apiUrl) {
    // Show user-friendly message
    const message = `
      <div style="text-align: left;">
        <h3>Thank you for your submission!</h3>
        <p>This demo is running on GitHub Pages without a backend server.</p>
        <p>In a production environment, your form would be submitted to our secure servers.</p>
        <br/>
        <p><strong>Your form data:</strong></p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">
${JSON.stringify(data, null, 2)}
        </pre>
        <br/>
        <p><strong>To submit this application:</strong></p>
        <ul style="list-style: disc; padding-left: 2rem;">
          <li>Email us at: aagtpvtloans@gmail.com</li>
          <li>Call us at: 1300 XXX XXX</li>
          <li>Or visit our office for a consultation</li>
        </ul>
      </div>
    `;
    
    if (onSuccess) {
      onSuccess({ 
        success: true, 
        message,
        isDemo: true 
      });
    }
    return { success: true, message, isDemo: true };
  }

  // Use external API if configured
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
export async function uploadFile(file: File, category: string): Promise<any> {
  if (isStaticExport && !apiUrl) {
    // Simulate file upload for demo
    return {
      success: true,
      file: {
        id: Math.random().toString(36).substr(2, 9),
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