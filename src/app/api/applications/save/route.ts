import { NextRequest, NextResponse } from 'next/server';
import type { ApplicationData } from '@/types/application';
import { validateApplication, sanitizeInput } from '@/utils/validation';

// In production, this would connect to your actual database
// For now, we'll simulate database operations

// Sanitize application data
function sanitizeApplicationData(data: ApplicationData): ApplicationData {
  const sanitized = { ...data };

  // Sanitize personal info
  if (sanitized.personalInfo) {
    Object.keys(sanitized.personalInfo).forEach(key => {
      const value = sanitized.personalInfo[key as keyof typeof sanitized.personalInfo];
      if (typeof value === 'string') {
        (sanitized.personalInfo as any)[key] = sanitizeInput(value);
      }
    });
  }

  // Sanitize business info
  if (sanitized.businessInfo) {
    Object.keys(sanitized.businessInfo).forEach(key => {
      const value = sanitized.businessInfo[key as keyof typeof sanitized.businessInfo];
      if (typeof value === 'string') {
        (sanitized.businessInfo as any)[key] = sanitizeInput(value);
      }
    });
  }

  // Sanitize other sections similarly...
  
  return sanitized;
}

// Simulate CRM integration
async function saveToCRM(applicationData: ApplicationData): Promise<{ crmId: string }> {
  // In production, integrate with your CRM (Salesforce, HubSpot, etc.)
  const crmData = {
    leadSource: 'Website Application',
    firstName: applicationData.personalInfo.firstName,
    lastName: applicationData.personalInfo.lastName,
    email: applicationData.personalInfo.email,
    phone: applicationData.personalInfo.phone,
    company: applicationData.businessInfo.businessName,
    loanAmount: applicationData.loanDetails.amount,
    loanPurpose: applicationData.loanDetails.purpose,
    status: applicationData.status,
    applicationId: applicationData.id,
    submittedAt: new Date().toISOString(),
  };

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate mock CRM ID
  const crmId = `CRM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('CRM Integration:', { crmId, crmData });
  
  return { crmId };
}

// Send notification emails
async function sendNotificationEmails(applicationData: ApplicationData): Promise<void> {
  // Send confirmation email to applicant
  const applicantEmailData = {
    to: applicationData.personalInfo.email,
    subject: 'Application Received - AAGT Private Loans',
    template: 'application_confirmation',
    data: {
      firstName: applicationData.personalInfo.firstName,
      applicationId: applicationData.id,
      loanAmount: applicationData.loanDetails.amount,
      submittedAt: new Date().toLocaleDateString(),
    },
  };

  // Send notification to lending team
  const teamEmailData = {
    to: 'applications@aagtprivateloans.com.au',
    subject: `New Loan Application - ${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName}`,
    template: 'new_application_notification',
    data: {
      applicantName: `${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName}`,
      loanAmount: applicationData.loanDetails.amount,
      businessName: applicationData.businessInfo.businessName,
      applicationId: applicationData.id,
    },
  };

  try {
    // In production, integrate with your email service
    console.log('Email notifications:', { applicantEmailData, teamEmailData });
    
    // Simulate sending emails
    await Promise.all([
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicantEmailData),
      }),
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamEmailData),
      }),
    ]);
  } catch (error) {
    console.error('Failed to send notification emails:', error);
    // Don't fail the application save if emails fail
  }
}

// Log application activity
async function logApplicationActivity(
  applicationId: string,
  action: string,
  details?: any
): Promise<void> {
  const logEntry = {
    applicationId,
    action,
    timestamp: new Date().toISOString(),
    details: details || {},
    userAgent: 'web-application',
  };

  // In production, log to your preferred logging service
  console.log('Application Activity:', logEntry);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ApplicationData;
    
    if (!body) {
      return NextResponse.json(
        { error: 'Application data is required' },
        { status: 400 }
      );
    }

    // Generate application ID if not present
    const applicationId = body.id || `APP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Sanitize input data
    const sanitizedData = sanitizeApplicationData({
      ...body,
      id: applicationId,
      lastSavedAt: new Date().toISOString(),
    });

    // Validate application data
    const validation = validateApplication(sanitizedData);
    
    // For draft saves, allow partial validation
    const isDraft = sanitizedData.status === 'draft';
    if (!isDraft && !validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          validationErrors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Save to database (simulated)
    await saveToDatabase(sanitizedData);
    
    // If this is a submission (not draft), integrate with CRM and send notifications
    if (sanitizedData.status === 'submitted') {
      try {
        // Save to CRM
        const crmResult = await saveToCRM(sanitizedData);
        
        // Send notification emails
        await sendNotificationEmails(sanitizedData);
        
        // Log submission
        await logApplicationActivity(applicationId, 'submitted', {
          crmId: crmResult.crmId,
          loanAmount: sanitizedData.loanDetails.amount,
        });
        
        return NextResponse.json({
          success: true,
          applicationId,
          crmId: crmResult.crmId,
          message: 'Application submitted successfully',
          nextSteps: [
            'You will receive a confirmation email shortly',
            'Our team will review your application within 24 hours',
            'We may contact you for additional information',
            'You will be notified of the decision via email and phone',
          ],
        });
      } catch (crmError) {
        console.error('CRM integration failed:', crmError);
        
        // Still return success but note the CRM issue
        return NextResponse.json({
          success: true,
          applicationId,
          message: 'Application saved successfully',
          warning: 'Some integrations are temporarily unavailable, but your application is secure',
        });
      }
    } else {
      // Draft save
      await logApplicationActivity(applicationId, 'draft_saved');
      
      return NextResponse.json({
        success: true,
        applicationId,
        message: 'Draft saved successfully',
        lastSavedAt: sanitizedData.lastSavedAt,
      });
    }

  } catch (error) {
    console.error('Application save error:', error);
    
    return NextResponse.json(
      { error: 'Failed to save application' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const applicationId = searchParams.get('id');

  if (!applicationId) {
    return NextResponse.json(
      { error: 'Application ID is required' },
      { status: 400 }
    );
  }

  try {
    // Retrieve from database (simulated)
    const applicationData = await getFromDatabase(applicationId);
    
    if (!applicationData) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    await logApplicationActivity(applicationId, 'retrieved');

    return NextResponse.json({
      success: true,
      data: applicationData,
    });

  } catch (error) {
    console.error('Application retrieval error:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve application' },
      { status: 500 }
    );
  }
}

// Simulated database operations
async function saveToDatabase(data: ApplicationData): Promise<{ id: string }> {
  // In production, save to your database
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // For demo purposes, we'll just return the ID
  return { id: data.id! };
}

async function getFromDatabase(_applicationId: string): Promise<ApplicationData | null> {
  // In production, retrieve from your database
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // For demo purposes, return null (not found)
  return null;
}