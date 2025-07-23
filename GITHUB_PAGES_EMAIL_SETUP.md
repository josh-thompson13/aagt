# GitHub Pages Email Setup with Formspree

Since GitHub Pages only supports static files and cannot run server-side code, we need to use a third-party service to handle form submissions and send emails. This guide shows how to set up Formspree for the loan application form.

## Why Formspree?

- **Free tier available**: Up to 50 submissions per month
- **Easy setup**: No backend coding required
- **Reliable**: Trusted by thousands of static sites
- **Email notifications**: Automatically sends emails to specified addresses
- **Form validation**: Built-in spam protection

## Step 1: Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## Step 2: Create a New Form

1. After logging in, click **"New Form"**
2. **Form Name**: Enter "AAGT Loan Applications"
3. **Email**: Enter `josh.thompsonau@icloud.com` (this is where submissions will be sent)
4. Click **"Create Form"**

## Step 3: Get Your Form Endpoint

After creating the form, you'll see a page with your form endpoint. It will look like:
```
https://formspree.io/f/xanbeprj
```

The endpoint is already configured in the code as: `https://formspree.io/f/xanbeprj`

## Step 5: Configure Form Settings (Optional)

In your Formspree dashboard, you can configure:

### Email Template
- Go to your form settings
- Click **"Emails"** tab
- You can customize the email template that gets sent to josh.thompsonau@icloud.com

### Spam Protection
- Formspree includes basic spam protection by default
- You can enable reCAPTCHA for additional protection

### Integrations
- Connect to other services like Slack, Zapier, etc.

## Step 6: Test the Setup

1. Build and deploy your site to GitHub Pages:
   ```bash
   bun run build:gh-pages
   git add .
   git commit -m "Add Formspree email integration"
   git push
   ```

2. Wait for GitHub Pages to deploy (usually 1-2 minutes)

3. Visit your site and submit a test application

4. Check josh.thompsonau@icloud.com for the email

## What Happens When Someone Submits the Form

1. User fills out the loan application form
2. Form data is sent to Formspree
3. Formspree processes the data and sends a formatted email to josh.thompsonau@icloud.com
4. User sees a success message
5. You receive an email with all the application details

## Email Format

The email will include all form fields in a clean, readable format:
- Full Name
- Contact Information (email, phone)
- Loan Details (amount, purpose, term)
- Security Information
- Business Details
- Additional Information
- Submission timestamp

## Troubleshooting

### Form Not Submitting
- Check browser console for errors
- Verify the Formspree endpoint URL is correct
- Make sure you're not hitting rate limits

### Email Not Received
- Check spam/junk folder
- Verify the email address in Formspree settings
- Check Formspree dashboard for submission logs

### CORS Errors
- Formspree handles CORS automatically
- If you see CORS errors, double-check the endpoint URL

## Formspree Pricing

- **Free Plan**: 50 submissions/month
- **Gold Plan**: $10/month for 1,000 submissions
- **Platinum Plan**: $40/month for 10,000 submissions

For a business loan application form, the free tier should be sufficient initially.

## Alternative Services

If you need more advanced features, consider:
- **Netlify Forms**: If you switch to Netlify hosting
- **EmailJS**: Client-side email sending
- **Web3Forms**: Alternative free form service
- **Getform**: Another form handling service

## Security Considerations

- Formspree encrypts data in transit
- Form submissions are logged in your Formspree dashboard
- Consider upgrading to paid plan for additional security features
- The form includes basic spam protection

## Production Checklist

- [ ] Formspree account created
- [ ] Form configured with correct email
- [ ] Form endpoint updated in code
- [ ] Test submission completed successfully
- [ ] Email received at josh.thompsonau@icloud.com
- [ ] Spam folder checked
- [ ] Form validation working properly

## Support

If you encounter issues:
1. Check the Formspree documentation: https://help.formspree.io/
2. Review submission logs in your Formspree dashboard
3. Verify all configuration steps were completed correctly

This setup will handle all loan application submissions and automatically send them to josh.thompsonau@icloud.com without requiring any server infrastructure.