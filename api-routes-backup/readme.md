# API Routes Notice

These API routes are not compatible with GitHub Pages static export.

For GitHub Pages deployment, you have these options:

1. **Use External Services:**
   - Formspree, Netlify Forms, or similar for form submissions
   - Uploadcare, Cloudinary for file uploads
   - SendGrid, Mailgun for email sending

2. **Deploy Backend Separately:**
   - Deploy these API routes to Vercel, Netlify Functions, or AWS Lambda
   - Update NEXT_PUBLIC_API_URL in .env.production

3. **Client-Side Only:**
   - Use mailto: links for contact forms
   - Store form data in localStorage for later submission
   - Show "Backend Required" messages for features needing server-side processing