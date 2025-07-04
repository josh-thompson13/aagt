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
      // Loan Requirements
      loanAmount,
      loanType,
      preferredTerm,
      timeframe,
      loanPurpose,
      // Security Information
      hasProperty,
      propertyValue,
      propertyAddress,
      // Additional Information
      declinedByBanks,
      workingWithBroker,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !businessName ||
      !loanAmount ||
      !loanType ||
      !loanPurpose
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

=== APPLICANT INFORMATION ===
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}

=== BUSINESS INFORMATION ===
Business Name: ${businessName}
ABN: ${abn || 'Not provided'}
Business Address: ${businessAddress || 'Not provided'}
Industry/Type: ${industry || 'Not provided'}
Years in Business: ${yearsInBusiness || 'Not provided'}

=== LOAN REQUIREMENTS ===
Loan Amount: ${loanAmount}
Loan Type: ${loanType}
Preferred Term: ${preferredTerm || 'Not specified'}
Timeframe Needed: ${timeframe || 'Not specified'}

Purpose of Loan:
${loanPurpose}

=== SECURITY INFORMATION ===
Property Available for Security: ${hasProperty || 'Not specified'}
Estimated Property Value: ${propertyValue ? `$${propertyValue}` : 'Not provided'}
Property Address: ${propertyAddress || 'Not provided'}

=== ADDITIONAL INFORMATION ===
Previously Declined by Banks: ${declinedByBanks ? 'Yes' : 'No'}
Working with Mortgage Broker: ${workingWithBroker ? 'Yes' : 'No'}

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
      subject: `[AAGT TEST] New Loan Application: ${firstName} ${lastName} - ${loanAmount} ${loanType}`,
      text: emailBody,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #0A2540; text-align: center; border-bottom: 3px solid #0891B2; padding-bottom: 15px;">
              🏦 NEW LOAN APPLICATION
            </h1>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #0891B2;">
              <h2 style="color: #0A2540; margin-top: 0;">👤 Applicant Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${firstName} ${lastName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}" style="color: #0891B2;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone || 'Not provided'}</td></tr>
              </table>
            </div>
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #0A2540;">
              <h2 style="color: #0A2540; margin-top: 0;">🏢 Business Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Business:</td><td>${businessName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">ABN:</td><td>${abn || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Address:</td><td>${businessAddress || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Industry:</td><td>${industry || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Years:</td><td>${yearsInBusiness || 'Not provided'}</td></tr>
              </table>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #F59E0B;">
              <h2 style="color: #0A2540; margin-top: 0;">💰 Loan Requirements</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Amount:</td><td style="font-size: 18px; font-weight: bold; color: #0A2540;">${loanAmount}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Type:</td><td style="font-weight: bold; color: #0891B2;">${loanType}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Term:</td><td>${preferredTerm || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Timeframe:</td><td>${timeframe || 'Not specified'}</td></tr>
              </table>
              
              <div style="margin-top: 15px;">
                <h3 style="color: #0A2540; margin-bottom: 10px;">Purpose of Loan:</h3>
                <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                  ${loanPurpose.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #10B981;">
              <h2 style="color: #0A2540; margin-top: 0;">🏠 Security Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Property Available:</td><td>${hasProperty || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Property Value:</td><td>${propertyValue ? `$${propertyValue}` : 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Property Address:</td><td>${propertyAddress || 'Not provided'}</td></tr>
              </table>
            </div>
            
            <div style="background: #fdf2f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #ec4899;">
              <h2 style="color: #0A2540; margin-top: 0;">ℹ️ Additional Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Declined by Banks:</td><td>${declinedByBanks ? '✅ Yes' : '❌ No'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Working with Broker:</td><td>${workingWithBroker ? '✅ Yes' : '❌ No'}</td></tr>
              </table>
            </div>
            
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
      console.log(`Applicant: ${firstName} ${lastName}`);
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
