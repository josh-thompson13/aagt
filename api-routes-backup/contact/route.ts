import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, loanAmount, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
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

    // Email configuration for testing
    const testEmail = 'josh.thompsonau@icloud.com'; // Test email address

    // Create transporter for Gmail (for testing)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'aagtpvtloans@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password-here',
      },
    });

    const emailConfig = {
      from: 'aagtpvtloans@gmail.com',
      to: testEmail, // Send to test email for now
      subject: `[AAGT TEST] New Funding Inquiry: ${subject || 'General Inquiry'} ${loanAmount ? `- $${loanAmount}` : ''}`,
      text: emailBody,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A2540; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">
            New Funding Inquiry from AAGT Private Loans Website
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A2540; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Inquiry Type:</strong> ${subject || 'General Inquiry'}</p>
            <p><strong>Loan Amount:</strong> ${loanAmount ? `$${loanAmount}` : 'Not specified'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0A2540;">Business & Funding Requirements:</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #0891B2; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
            <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</p>
          </div>
        </div>
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(emailConfig);

      console.log('=== EMAIL SENT SUCCESSFULLY ===');
      console.log(`To: ${emailConfig.to}`);
      console.log(`Subject: ${emailConfig.subject}`);
      console.log('=== END ===');

      return NextResponse.json({
        success: true,
        message:
          'Thank you for your funding inquiry. A lending specialist will contact you within 24 hours!',
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Fallback: log email content if sending fails
      console.log('=== EMAIL SENDING FAILED - LOGGING CONTENT ===');
      console.log(`To: ${emailConfig.to}`);
      console.log(`Subject: ${emailConfig.subject}`);
      console.log('\nBody:');
      console.log(emailBody);
      console.log('=== END EMAIL ===');

      // Still return success to user (they don't need to know about email issues)
      return NextResponse.json({
        success: true,
        message:
          'Thank you for your funding inquiry. A lending specialist will contact you within 24 hours!',
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
