import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ApplicationFormData {
  // Loan Details
  loanAmount: string;
  loanPurpose: string;
  preferredTerm: string;
  // Security Details
  propertyType: string;
  propertyValue: string;
  propertyAddress: string;
  // Applicant Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  abn: string;
  businessAddress: string;
  industry: string;
  yearsInBusiness: string;
  // Additional Required Fields
  borrowingEntity: string;
  directorsNames: string;
  fundsRequiredDate: string;
  securityOffered: string;
  debtOwing: string;
  bankruptcyHistory: string;
  exitStrategy: string;
  // Additional Information
  declinedByBanks: boolean;
  workingWithBroker: boolean;
  agreeToTerms: boolean;
  receiveUpdates: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ApplicationFormData = await request.json();

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format the loan amount
    const formattedLoanAmount = formData.loanAmount 
      ? `$${parseInt(formData.loanAmount.replace(/[^0-9]/g, '') || '0').toLocaleString()}`
      : 'Not specified';

    // Create email content
    const emailHtml = `
      <h2>New Loan Application Received</h2>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString('en-AU')}</p>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
      </ul>

      <h3>Loan Details</h3>
      <ul>
        <li><strong>Requested Amount:</strong> ${formattedLoanAmount}</li>
        <li><strong>Loan Purpose:</strong> ${formData.loanPurpose}</li>
        <li><strong>Preferred Term:</strong> ${formData.preferredTerm}</li>
        <li><strong>Funds Required Date:</strong> ${formData.fundsRequiredDate}</li>
      </ul>

      <h3>Security Details</h3>
      <ul>
        <li><strong>Security Offered:</strong> ${formData.securityOffered}</li>
        <li><strong>Estimated Value:</strong> ${formData.propertyValue}</li>
        <li><strong>Property Address:</strong> ${formData.propertyAddress || 'Not provided'}</li>
        <li><strong>Debt Owing:</strong> ${formData.debtOwing}</li>
      </ul>

      <h3>Business Information</h3>
      <ul>
        <li><strong>Borrowing Entity:</strong> ${formData.borrowingEntity}</li>
        <li><strong>Directors Names:</strong> ${formData.directorsNames}</li>
        <li><strong>Business Name:</strong> ${formData.businessName || 'Not provided'}</li>
        <li><strong>ABN:</strong> ${formData.abn || 'Not provided'}</li>
        <li><strong>Business Address:</strong> ${formData.businessAddress}</li>
        <li><strong>Industry:</strong> ${formData.industry}</li>
        <li><strong>Years in Business:</strong> ${formData.yearsInBusiness}</li>
      </ul>

      <h3>Additional Information</h3>
      <ul>
        <li><strong>Bankruptcy History:</strong> ${formData.bankruptcyHistory}</li>
        <li><strong>Exit Strategy:</strong> ${formData.exitStrategy}</li>
        <li><strong>Declined by Banks:</strong> ${formData.declinedByBanks ? 'Yes' : 'No'}</li>
        <li><strong>Working with Broker:</strong> ${formData.workingWithBroker ? 'Yes' : 'No'}</li>
        <li><strong>Agreed to Terms:</strong> ${formData.agreeToTerms ? 'Yes' : 'No'}</li>
        <li><strong>Receive Updates:</strong> ${formData.receiveUpdates ? 'Yes' : 'No'}</li>
      </ul>

      <hr>
      <p><em>This application was submitted through the AAGT Private Loans website.</em></p>
    `;

    const emailText = `
New Loan Application Received

Submission Date: ${new Date().toLocaleString('en-AU')}

Contact Information:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}

Loan Details:
- Requested Amount: ${formattedLoanAmount}
- Loan Purpose: ${formData.loanPurpose}
- Preferred Term: ${formData.preferredTerm}
- Funds Required Date: ${formData.fundsRequiredDate}

Security Details:
- Security Offered: ${formData.securityOffered}
- Estimated Value: ${formData.propertyValue}
- Property Address: ${formData.propertyAddress || 'Not provided'}
- Debt Owing: ${formData.debtOwing}

Business Information:
- Borrowing Entity: ${formData.borrowingEntity}
- Directors Names: ${formData.directorsNames}
- Business Name: ${formData.businessName || 'Not provided'}
- ABN: ${formData.abn || 'Not provided'}
- Business Address: ${formData.businessAddress}
- Industry: ${formData.industry}
- Years in Business: ${formData.yearsInBusiness}

Additional Information:
- Bankruptcy History: ${formData.bankruptcyHistory}
- Exit Strategy: ${formData.exitStrategy}
- Declined by Banks: ${formData.declinedByBanks ? 'Yes' : 'No'}
- Working with Broker: ${formData.workingWithBroker ? 'Yes' : 'No'}
- Agreed to Terms: ${formData.agreeToTerms ? 'Yes' : 'No'}
- Receive Updates: ${formData.receiveUpdates ? 'Yes' : 'No'}

This application was submitted through the AAGT Private Loans website.
    `;

    // Send email
    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: 'jtbusinessau@gmail.com',
      subject: `New Loan Application - ${formData.firstName} ${formData.lastName} (${formattedLoanAmount})`,
      text: emailText,
      html: emailHtml,
      replyTo: formData.email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}