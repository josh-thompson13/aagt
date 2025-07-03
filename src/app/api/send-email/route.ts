import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import DOMPurify from 'isomorphic-dompurify';
import { env } from '@/utils/env';

interface EmailRequest {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

// Email templates
const EMAIL_TEMPLATES = {
  application_confirmation: {
    subject: 'Application Received - AAGT Private Loans',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Application Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0A2540; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { background: #eee; padding: 15px; text-align: center; font-size: 12px; }
            .highlight { background: #0891B2; color: white; padding: 10px; border-radius: 5px; margin: 15px 0; }
            .button { background: #0891B2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AAGT Private Loans</h1>
              <h2>Application Received</h2>
            </div>
            <div class="content">
              <h3>Dear ${DOMPurify.sanitize(data.firstName)},</h3>
              
              <p>Thank you for submitting your loan application with AAGT Private Loans. We have successfully received your application and our team is reviewing it.</p>
              
              <div class="highlight">
                <strong>Application Details:</strong><br>
                Application ID: ${DOMPurify.sanitize(data.applicationId)}<br>
                Loan Amount: $${DOMPurify.sanitize(data.loanAmount?.toLocaleString())}<br>
                Submitted: ${DOMPurify.sanitize(data.submittedAt)}
              </div>
              
              <h4>What happens next?</h4>
              <ul>
                <li>Our lending team will review your application within 24 hours</li>
                <li>We may contact you for additional information if required</li>
                <li>You will receive an initial decision within 2 business days</li>
                <li>Upon approval, funds can be settled within 4 business days</li>
              </ul>
              
              <p>If you have any questions, please don't hesitate to contact us:</p>
              <ul>
                <li>Phone: ${env.COMPANY_PHONE}</li>
                <li>Email: ${env.COMPANY_EMAIL}</li>
              </ul>
              
              <a href="${env.SITE_URL}/application-status?id=${data.applicationId}" class="button">
                Check Application Status
              </a>
            </div>
            <div class="footer">
              <p>AAGT Private Loans - Making business funding accessible and straightforward</p>
              <p>${env.COMPANY_ADDRESS}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: (data: any) => `
      Dear ${data.firstName},
      
      Thank you for submitting your loan application with AAGT Private Loans.
      
      Application Details:
      - Application ID: ${data.applicationId}
      - Loan Amount: $${data.loanAmount?.toLocaleString()}
      - Submitted: ${data.submittedAt}
      
      What happens next?
      - Our lending team will review your application within 24 hours
      - We may contact you for additional information if required
      - You will receive an initial decision within 2 business days
      - Upon approval, funds can be settled within 4 business days
      
      Contact us:
      Phone: ${env.COMPANY_PHONE}
      Email: ${env.COMPANY_EMAIL}
      
      Check your application status: ${env.SITE_URL}/application-status?id=${data.applicationId}
      
      AAGT Private Loans
      ${env.COMPANY_ADDRESS}
    `
  },
  
  new_application_notification: {
    subject: (data: any) => `New Loan Application - ${data.applicantName}`,
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Application Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0A2540; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .details { background: #f5f5f5; padding: 15px; border-left: 4px solid #0891B2; margin: 15px 0; }
            .button { background: #0891B2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Loan Application</h1>
            </div>
            <div class="content">
              <h3>New application received from ${DOMPurify.sanitize(data.applicantName)}</h3>
              
              <div class="details">
                <strong>Application Details:</strong><br>
                ID: ${DOMPurify.sanitize(data.applicationId)}<br>
                Applicant: ${DOMPurify.sanitize(data.applicantName)}<br>
                Business: ${DOMPurify.sanitize(data.businessName)}<br>
                Loan Amount: $${DOMPurify.sanitize(data.loanAmount?.toLocaleString())}<br>
                Submitted: ${new Date().toLocaleString()}
              </div>
              
              <a href="${env.SITE_URL}/admin/applications/${data.applicationId}" class="button">
                Review Application
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
    text: (data: any) => `
      New Loan Application Received
      
      Applicant: ${data.applicantName}
      Business: ${data.businessName}
      Loan Amount: $${data.loanAmount?.toLocaleString()}
      Application ID: ${data.applicationId}
      Submitted: ${new Date().toLocaleString()}
      
      Review at: ${env.SITE_URL}/admin/applications/${data.applicationId}
    `
  }
};

// Create nodemailer transporter
function createTransporter() {
  return nodemailer.createTransporter({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// Validate email address
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting for email sending
const emailAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_EMAILS_PER_HOUR = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkEmailRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = emailAttempts.get(email);
  
  if (!attempts) {
    emailAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }
  
  if (now - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
    emailAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }
  
  if (attempts.count < MAX_EMAILS_PER_HOUR) {
    attempts.count++;
    attempts.lastAttempt = now;
    return true;
  }
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, template, data }: EmailRequest = await request.json();
    
    if (!to || !template) {
      return NextResponse.json(
        { error: 'Recipient email and template are required' },
        { status: 400 }
      );
    }

    // Validate email address
    if (!isValidEmail(to)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check rate limit
    if (!checkEmailRateLimit(to)) {
      return NextResponse.json(
        { error: 'Too many emails sent to this address. Please try again later.' },
        { status: 429 }
      );
    }

    // Get email template
    const emailTemplate = EMAIL_TEMPLATES[template as keyof typeof EMAIL_TEMPLATES];
    if (!emailTemplate) {
      return NextResponse.json(
        { error: 'Invalid email template' },
        { status: 400 }
      );
    }

    // Sanitize data
    const sanitizedData = Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      acc[key] = typeof value === 'string' ? DOMPurify.sanitize(value) : value;
      return acc;
    }, {} as Record<string, any>);

    // Generate email content
    const emailSubject = typeof emailTemplate.subject === 'function' 
      ? emailTemplate.subject(sanitizedData)
      : subject || emailTemplate.subject;
    
    const htmlContent = emailTemplate.html(sanitizedData);
    const textContent = emailTemplate.text(sanitizedData);

    // Skip actual email sending in development
    if (env.NODE_ENV === 'development') {
      console.log('Email would be sent:', {
        to,
        subject: emailSubject,
        template,
        data: sanitizedData,
      });
      
      return NextResponse.json({
        success: true,
        message: 'Email queued for sending (development mode)',
        messageId: `dev_${Date.now()}`,
      });
    }

    // Create transporter and send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"AAGT Private Loans" <${env.FROM_EMAIL}>`,
      to,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Application': 'AAGT-Loan-Application',
        'X-Template': template,
      },
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Log email activity
    console.log('Email sent:', {
      messageId: info.messageId,
      to,
      template,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Email Service API',
      availableTemplates: Object.keys(EMAIL_TEMPLATES),
      endpoint: 'POST /api/send-email',
      parameters: {
        to: 'Recipient email address',
        subject: 'Email subject (optional if template has default)',
        template: 'Template name',
        data: 'Template data object',
      },
    },
    { status: 200 }
  );
}