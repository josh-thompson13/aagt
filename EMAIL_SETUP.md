# Email Setup Guide for AAGT Private Loans Application Form

This guide explains how to configure email functionality for the loan application form to send emails to josh.thompsonau@icloud.com.

## Prerequisites

1. A Gmail account that will be used to send the emails
2. Gmail App Password (for authentication)

## Step 1: Set up Gmail App Password

1. Log into your Gmail account
2. Go to Google Account settings (https://myaccount.google.com/)
3. Navigate to **Security** tab
4. Enable **2-Step Verification** if not already enabled
5. Once 2-Step Verification is enabled, look for **App passwords**
6. Click **App passwords**
7. Select **Mail** as the app and your device
8. Google will generate a 16-character password - save this securely

## Step 2: Create Environment Variables

Create a `.env.local` file in the root directory of your project with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL=your-gmail-address@gmail.com

# Disable GitHub Pages mode for local development
NEXT_PUBLIC_GITHUB_PAGES=false
```

**Important Notes:**
- Replace `your-gmail-address@gmail.com` with your actual Gmail address
- Replace `your-16-character-app-password` with the App Password from Step 1
- Do NOT use your regular Gmail password - use the App Password
- Never commit the `.env.local` file to version control

## Step 3: Test the Configuration

1. Start the development server:
   ```bash
   bun run dev
   ```

2. Navigate to http://localhost:3000/apply (or whatever port is shown)

3. Fill out and submit the loan application form

4. Check that josh.thompsonau@icloud.com receives the email

## How It Works

1. When a user submits the loan application form, it sends a POST request to `/api/apply`
2. The API route (`src/app/api/apply/route.ts`) processes the form data
3. Using Nodemailer, it formats the application data into a professional email
4. The email is sent to josh.thompsonau@icloud.com with all the application details
5. The user receives a confirmation message that their application was submitted

## Email Content

The email includes:
- Contact information (name, email, phone)
- Loan details (amount, purpose, term, required date)
- Security details (property info, debt owing)
- Business information (entity details, industry, experience)
- Additional information (bankruptcy history, exit strategy)
- Application preferences (broker status, bank declinations)

## Troubleshooting

### Common Issues:

1. **Authentication Error (535 Username/Password not accepted)**
   - Make sure you're using the App Password, not your regular Gmail password
   - Verify 2-Step Verification is enabled on your Google account

2. **Connection Timeout**
   - Check your internet connection
   - Verify the SMTP settings are correct

3. **Form Not Submitting**
   - Check browser console for JavaScript errors
   - Verify the API route is accessible at `/api/apply`

4. **Email Not Received**
   - Check spam/junk folder
   - Verify the recipient email address is correct
   - Check that the SMTP_USER has permission to send emails

### Development vs Production

- In development: Use `.env.local` file
- In production: Set environment variables through your hosting platform
- The form will fallback to demo mode if email configuration is missing

## Security Considerations

- Never commit email credentials to version control
- Use App Passwords instead of regular passwords
- Consider using environment-specific email addresses
- Implement rate limiting for production use
- Consider adding email validation and sanitization

## Production Deployment

For production deployment:

1. Set the environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Consider using a dedicated SMTP service (SendGrid, Mailgun, etc.) for better deliverability
3. Implement proper error handling and logging
4. Add email templates for better formatting
5. Consider adding email confirmation to the applicant

## Support

If you encounter issues with email setup, check:
1. Environment variables are correctly set
2. Gmail App Password is valid and correctly entered
3. No firewall or network restrictions blocking SMTP
4. The recipient email address (josh.thompsonau@icloud.com) is correct