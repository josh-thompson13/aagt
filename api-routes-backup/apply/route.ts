import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      // Personal Information
      firstName,
      lastName,
      email,
      phone,
      // Business Information
      businessName,
      abn,
      businessAddress,
      industry,
      yearsInBusiness,
      borrowingEntity,
      directorsNames,
      // Loan Requirements
      loanAmount,
      loanPurpose,
      preferredTerm,
      fundsRequiredDate,
      // Security Information
      propertyType,
      propertyValue,
      propertyAddress,
      securityOffered,
      debtOwing,
      // Additional Information
      bankruptcyHistory,
      exitStrategy,
      declinedByBanks,
      workingWithBroker,
      receiveUpdates,
    } = body;

    // Validate required fields
    if (
      !email ||
      !borrowingEntity ||
      !directorsNames ||
      !loanAmount ||
      !fundsRequiredDate ||
      !loanPurpose ||
      !securityOffered ||
      !propertyValue ||
      !debtOwing ||
      !bankruptcyHistory ||
      !exitStrategy
    ) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    // Create comprehensive email content
    const emailBody = `
NEW LOAN APPLICATION - AAGT Private Loans

=== CONTACT INFORMATION ===
Email: ${email}
Sign up for news and updates: ${receiveUpdates ? 'Yes' : 'No'}

=== BORROWING ENTITY ===
Name of Borrowing Entity: ${borrowingEntity}
Names of Directors: ${directorsNames}

=== LOAN REQUIREMENTS ===
Required Loan Amount: ${loanAmount}
When are Funds Required: ${fundsRequiredDate}
What is Loan Purpose: ${loanPurpose}

=== SECURITY INFORMATION ===
What type of Security is offered: ${securityOffered}
What is Estimated Value: ${propertyValue}
Any debt owing? To who?: ${debtOwing}

=== ADDITIONAL INFORMATION ===
Are you/have you ever been Bankrupt?: ${bankruptcyHistory}
What is your Exit Strategy?: ${exitStrategy}

=== PERSONAL DETAILS (IF PROVIDED) ===
First Name: ${firstName || 'Not provided'}
Last Name: ${lastName || 'Not provided'}
Phone: ${phone || 'Not provided'}

=== BUSINESS DETAILS (IF PROVIDED) ===
Business Name: ${businessName || 'Not provided'}
ABN: ${abn || 'Not provided'}
Business Address: ${businessAddress || 'Not provided'}
Industry/Type: ${industry || 'Not provided'}
Years in Business: ${yearsInBusiness || 'Not provided'}

=== PROPERTY DETAILS (IF PROVIDED) ===
Property Type: ${propertyType || 'Not provided'}
Property Address: ${propertyAddress || 'Not provided'}

=== OTHER INFORMATION ===
Previously Declined by Banks: ${declinedByBanks ? 'Yes' : 'No'}
Working with Mortgage Broker: ${workingWithBroker ? 'Yes' : 'No'}
Loan Term: ${preferredTerm || 'Not specified'}

=== SUBMISSION DETAILS ===
Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
IP Address: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}
    `.trim();

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
      subject: `[AAGT TEST] New Loan Application: ${borrowingEntity} - ${loanAmount}`,
      text: emailBody,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #0A2540; text-align: center; border-bottom: 3px solid #0891B2; padding-bottom: 15px;">
              🏦 NEW LOAN APPLICATION
            </h1>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #0891B2;">
              <h2 style="color: #0A2540; margin-top: 0;">📧 Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Email:</td><td><a href="mailto:${email}" style="color: #0891B2;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Newsletter Sign-up:</td><td>${receiveUpdates ? '✅ Yes' : '❌ No'}</td></tr>
              </table>
            </div>
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #0A2540;">
              <h2 style="color: #0A2540; margin-top: 0;">🏢 Borrowing Entity</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Borrowing Entity:</td><td style="font-weight: bold;">${borrowingEntity}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Directors:</td><td>${directorsNames}</td></tr>
              </table>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #F59E0B;">
              <h2 style="color: #0A2540; margin-top: 0;">💰 Loan Requirements</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Required Amount:</td><td style="font-size: 18px; font-weight: bold; color: #0A2540;">${loanAmount}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Funds Required By:</td><td style="font-weight: bold; color: #0891B2;">${fundsRequiredDate}</td></tr>
              </table>
              
              <div style="margin-top: 15px;">
                <h3 style="color: #0A2540; margin-bottom: 10px;">Loan Purpose:</h3>
                <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                  ${loanPurpose.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #10B981;">
              <h2 style="color: #0A2540; margin-top: 0;">🏠 Security Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Security Offered:</td><td>${securityOffered}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Estimated Value:</td><td>${propertyValue}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Debt Owing:</td><td>${debtOwing}</td></tr>
              </table>
            </div>
            
            <div style="background: #fdf2f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #ec4899;">
              <h2 style="color: #0A2540; margin-top: 0;">⚠️ Important Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Bankruptcy History:</td><td>${bankruptcyHistory}</td></tr>
              </table>
              <div style="margin-top: 15px;">
                <h3 style="color: #0A2540; margin-bottom: 10px;">Exit Strategy:</h3>
                <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                  ${exitStrategy.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            ${(firstName || lastName || phone || businessName || abn || businessAddress || industry || yearsInBusiness || propertyType || propertyAddress || declinedByBanks || workingWithBroker) ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #6c757d;">
              <h2 style="color: #0A2540; margin-top: 0;">📋 Additional Details (if provided)</h2>
              <table style="width: 100%; border-collapse: collapse;">
                ${firstName || lastName ? `<tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Name:</td><td>${firstName || ''} ${lastName || ''}</td></tr>` : ''}
                ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone}</td></tr>` : ''}
                ${businessName ? `<tr><td style="padding: 8px 0; font-weight: bold;">Business Name:</td><td>${businessName}</td></tr>` : ''}
                ${abn ? `<tr><td style="padding: 8px 0; font-weight: bold;">ABN:</td><td>${abn}</td></tr>` : ''}
                ${businessAddress ? `<tr><td style="padding: 8px 0; font-weight: bold;">Business Address:</td><td>${businessAddress}</td></tr>` : ''}
                ${industry ? `<tr><td style="padding: 8px 0; font-weight: bold;">Industry:</td><td>${industry}</td></tr>` : ''}
                ${yearsInBusiness ? `<tr><td style="padding: 8px 0; font-weight: bold;">Years in Business:</td><td>${yearsInBusiness}</td></tr>` : ''}
                ${propertyType ? `<tr><td style="padding: 8px 0; font-weight: bold;">Property Type:</td><td>${propertyType}</td></tr>` : ''}
                ${propertyAddress ? `<tr><td style="padding: 8px 0; font-weight: bold;">Property Address:</td><td>${propertyAddress}</td></tr>` : ''}
                ${preferredTerm ? `<tr><td style="padding: 8px 0; font-weight: bold;">Loan Term:</td><td>${preferredTerm}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; font-weight: bold;">Declined by Banks:</td><td>${declinedByBanks ? '✅ Yes' : '❌ No'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Working with Broker:</td><td>${workingWithBroker ? '✅ Yes' : '❌ No'}</td></tr>
              </table>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef; font-size: 12px; color: #6c757d; text-align: center;">
              <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
              <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</p>
            </div>
          </div>
        </div>
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(emailConfig);

      console.log('=== LOAN APPLICATION EMAIL SENT SUCCESSFULLY ===');
      console.log(`To: ${emailConfig.to}`);
      console.log(`Subject: ${emailConfig.subject}`);
      console.log(`Borrowing Entity: ${borrowingEntity}`);
      console.log(`Amount: ${loanAmount}`);
      console.log('=== END ===');

      return NextResponse.json({
        success: true,
        message:
          'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.',
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Fallback: log email content if sending fails
      console.log('=== LOAN APPLICATION EMAIL SENDING FAILED - LOGGING CONTENT ===');
      console.log(`To: ${emailConfig.to}`);
      console.log(`Subject: ${emailConfig.subject}`);
      console.log('\nBody:');
      console.log(emailBody);
      console.log('=== END EMAIL ===');

      // Still return success to user (they don't need to know about email issues)
      return NextResponse.json({
        success: true,
        message:
          'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.',
      });
    }
  } catch (error) {
    console.error('Application form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
