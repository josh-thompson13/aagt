# GitHub Pages Deployment Guide

This site is configured to work with GitHub Pages. Follow these steps to deploy:

## 1. Repository Setup

1. Push your code to GitHub
2. Go to Settings → Pages in your repository
3. Under "Build and deployment", select "GitHub Actions" as the source

## 2. Update Configuration

### If deploying to `username.github.io/repository-name`:

1. Edit `.env.production`:
   ```
   NEXT_PUBLIC_BASE_PATH=/repository-name
   ```

2. Uncomment and update in `next.config.ts`:
   ```typescript
   basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
   ```

### If deploying to `username.github.io` (root):
No changes needed, the current configuration will work.

## 3. Deploy

The site will automatically deploy when you push to the `main` branch.

You can also manually trigger deployment:
1. Go to Actions tab
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## 4. API Routes Notice

**Important**: GitHub Pages only supports static sites. The API routes in this project won't work on GitHub Pages.

### Options for handling forms and file uploads:

1. **Use External Services:**
   - [Formspree](https://formspree.io/) for form submissions
   - [Uploadcare](https://uploadcare.com/) for file uploads
   - [EmailJS](https://www.emailjs.com/) for sending emails

2. **Deploy Backend Separately:**
   - Deploy API routes to Vercel, Netlify Functions, or AWS Lambda
   - Update `NEXT_PUBLIC_API_URL` in `.env.production`

3. **Use Static Forms:**
   - Configure forms to use `mailto:` links
   - Display contact information for manual submissions

## 5. Forms Configuration

The application forms (contact, apply, document upload) need to be configured for static hosting:

### Option 1: Formspree (Recommended)
```typescript
// In your form components
const handleSubmit = async (data) => {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // Handle response
};
```

### Option 2: Netlify Forms (if migrating to Netlify)
Add `data-netlify="true"` to your form elements.

### Option 3: Static Display
Forms will show a message that backend services are required.

## 6. Build Output

After running `bun run build:gh-pages`, the static site is generated in the `out/` directory with:
- All pages pre-rendered as static HTML
- Optimized assets
- `.nojekyll` file (prevents Jekyll processing)

## 7. Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in repository settings

## 8. Monitoring

Check deployment status:
- Actions tab shows build/deploy progress
- Pages settings shows deployment URL
- Check https://username.github.io/repository-name/

## Troubleshooting

- **404 errors**: Ensure `trailingSlash: true` in next.config.ts
- **Missing styles**: Check if `basePath` is correctly configured
- **Forms not working**: This is expected - implement one of the solutions above
- **Build failures**: Check GitHub Actions logs for details

## Local Testing

Test the static export locally:
```bash
bun run build:gh-pages
cd out
python -m http.server 8000
# Visit http://localhost:8000
```