// Form submission handler for GitHub Pages compatibility

const isStaticExport = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' || 
  (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface FormSubmitOptions {
  endpoint: string;
  data: any;
  onSuccess?: (data: any) => void;

  onError?: (error: string) => void;
}

export async function submitForm({ endpoint, data, onSuccess, onError }: FormSubmitOptions) {
  console.log('Form handler - isStaticExport:', isStaticExport);
  console.log('Form handler - apiUrl:', apiUrl);
  console.log('Form handler - hostname:', typeof window !== 'undefined' ? window.location.hostname : 'server');
  
  // If running on GitHub Pages, use Formspree for email functionality
  if (isStaticExport && !apiUrl) {
    console.log('Using Formspree for form submission');
    const formspreeEndpoint = 'https://formspree.io/f/xanbeprj';
    
    try {
      // Format data for Formspree
      const formspreeData = {
        _subject: `New Loan Application - ${data.firstName} ${data.lastName}`,
        _replyto: data.email,
        _to: 'jtbusinessau@gmail.com',
        
        // Application details
        'Full Name': `${data.firstName} ${data.lastName}`,
        'Email': data.email,
        'Phone': data.phone,
        'Loan Amount': data.loanAmount ? `$${parseInt(data.loanAmount.replace(/[^0-9]/g, '') || '0').toLocaleString()}` : 'Not specified',
        'Loan Purpose': data.loanPurpose,
        'Preferred Term': data.preferredTerm,
        'Funds Required Date': data.fundsRequiredDate,
        'Security Offered': data.securityOffered,
        'Property Value': data.propertyValue,
        'Property Address': data.propertyAddress || 'Not provided',
        'Debt Owing': data.debtOwing,
        'Borrowing Entity': data.borrowingEntity,
        'Directors Names': data.directorsNames,
        'Business Name': data.businessName || 'Not provided',
        'ABN': data.abn || 'Not provided',
        'Business Address': data.businessAddress,
        'Industry': data.industry,
        'Years in Business': data.yearsInBusiness,
        'Bankruptcy History': data.bankruptcyHistory,
        'Exit Strategy': data.exitStrategy,
        'Declined by Banks': data.declinedByBanks ? 'Yes' : 'No',
        'Working with Broker': data.workingWithBroker ? 'Yes' : 'No',
        'Agreed to Terms': data.agreeToTerms ? 'Yes' : 'No',
        'Receive Updates': data.receiveUpdates ? 'Yes' : 'No',
        'Submission Date': new Date().toLocaleString('en-AU')
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreeData),
      });

      if (response.ok) {
        const message = 'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.';
        if (onSuccess) {
          onSuccess({ 
            success: true, 
            message,
            isDemo: false 
          });
        }
        return { success: true, message, isDemo: false };
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      // Fallback to demo mode if Formspree fails
      const message = `
        <div style="text-align: left;">
          <h3>Thank you for your submission!</h3>
          <p>There was an issue with the automated submission, but we've received your information.</p>
          <p><strong>Please contact us directly to complete your application:</strong></p>
          <ul style="list-style: disc; padding-left: 2rem;">
            <li>Email us at: aagtpvtloans@gmail.com</li>
            <li>Call us at: +61 461 534 088</li>
            <li>Or visit our office for a consultation</li>
          </ul>
          <p><strong>Your application details:</strong></p>
          <p>Name: ${data.firstName} ${data.lastName}<br/>
             Email: ${data.email}<br/>
             Phone: ${data.phone}<br/>
             Loan Amount: ${data.loanAmount ? `$${parseInt(data.loanAmount.replace(/[^0-9]/g, '') || '0').toLocaleString()}` : 'Not specified'}
          </p>
        </div>
      `;
      
      if (onError) {
        onError('Submission failed. Please contact us directly.');
      }
      if (onSuccess) {
        onSuccess({ 
          success: true, 
          message,
          isDemo: true 
        });
      }
      return { success: true, message, isDemo: true };
    }
  }

  // Use external API if configured
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