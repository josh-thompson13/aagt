// GitHub Pages configuration
export const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';

// API endpoints for production (when using a separate backend)
export const apiEndpoints = {
  contact: isGitHubPages 
    ? process.env.NEXT_PUBLIC_API_URL + '/contact'
    : '/api/contact',
  apply: isGitHubPages 
    ? process.env.NEXT_PUBLIC_API_URL + '/apply'
    : '/api/apply',
  uploadDocument: isGitHubPages 
    ? process.env.NEXT_PUBLIC_API_URL + '/upload-document'
    : '/api/upload-document',
};

// For GitHub Pages, forms should either:
// 1. Submit to an external API service
// 2. Use a form service like Formspree, Netlify Forms, etc.
// 3. Show a message that the feature requires a backend
export const formHandling = {
  useExternalService: isGitHubPages,
  showBackendRequiredMessage: isGitHubPages && !process.env.NEXT_PUBLIC_API_URL,
};