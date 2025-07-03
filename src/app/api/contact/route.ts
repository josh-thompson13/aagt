import { NextRequest, NextResponse } from 'next/server';
import { AppConfig } from '@/utils/AppConfig';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, loanAmount, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create email content
    const emailBody = `
New Funding Inquiry from AAGT Private Loans Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Inquiry Type: ${subject || 'General Inquiry'}
Loan Amount: ${loanAmount ? `$${loanAmount}` : 'Not specified'}

Business & Funding Requirements:
${message}

---
Submitted at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
IP Address: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
    `.trim();

    // For now, we'll use a simple email service
    // In production, you'd want to use a service like SendGrid, AWS SES, etc.
    
    // Check if we have email configuration
    const emailConfig = {
      to: AppConfig.email,
      from: process.env.SMTP_FROM || `noreply@${AppConfig.domain.replace('https://', '')}`,
      subject: `New Funding Inquiry: ${subject || 'General Inquiry'} ${loanAmount ? `- $${loanAmount}` : ''}`,
      text: emailBody,
      replyTo: email
    };

    // For development/testing, we'll just log the email content
    if (process.env.NODE_ENV === 'development') {
      console.log('=== FUNDING INQUIRY EMAIL ===');
      console.log(`To: ${emailConfig.to}`);
      console.log(`From: ${emailConfig.from}`);
      console.log(`Subject: ${emailConfig.subject}`);
      console.log(`Reply-To: ${emailConfig.replyTo}`);
      console.log('\nBody:');
      console.log(emailConfig.text);
      console.log('=== END EMAIL ===');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your funding inquiry. A lending specialist will contact you within 24 hours!' 
      });
    }

    // In production, you would implement actual email sending here
    // For example, using SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: emailConfig.to,
      from: emailConfig.from,
      subject: emailConfig.subject,
      text: emailConfig.text,
      replyTo: emailConfig.replyTo
    });
    */

    // For now, return success (you'll need to implement actual email sending)
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your funding inquiry. A lending specialist will contact you within 24 hours!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}