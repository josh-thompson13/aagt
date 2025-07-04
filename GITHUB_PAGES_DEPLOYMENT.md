# GitHub Pages Deployment Guide

This site has been configured for GitHub Pages deployment with the following setup:

## Configuration Changes Made

1. **Next.js Static Export**: Added `output: 'export'` to `next.config.ts`
2. **Image Optimization**: Set `images.unoptimized: true` for static export compatibility
3. **Jekyll Bypass**: Added `.nojekyll` file to public directory
4. **Build Scripts**: Added `build:gh-pages` script to package.json
5. **GitHub Actions**: Updated deployment workflow to use Bun

## Important Notes

### API Routes
The following API routes exist but will NOT work on GitHub Pages (static hosting):
- `/api/apply` - Application form submission
- `/api/contact` - Contact form submission  
- `/api/upload-document` - Document upload functionality

**Solution Options:**
1. Use a third-party form service (Formspree, Netlify Forms, etc.)
2. Implement client-side form handling with email service (EmailJS)
3. Deploy to a platform that supports serverless functions (Vercel, Netlify)

### Deployment Steps

1. Push your code to the `main` branch
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The site will automatically deploy on push to main

### Build Commands

```bash
# Development
bun run dev

# Build for GitHub Pages
bun run build:gh-pages

# The build output will be in the 'out' directory
```

### Custom Domain

If using a custom domain:
1. Add a CNAME file to the public directory with your domain
2. Configure DNS settings as per GitHub's documentation

## Limitations

Due to static hosting limitations:
- No server-side rendering
- No API routes
- No dynamic routes with runtime data fetching
- Forms require external services

## Alternative Deployment

For full functionality including API routes, consider deploying to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting provider