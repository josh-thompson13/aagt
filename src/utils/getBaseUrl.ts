export function getBaseUrl(): string {
  // For GitHub Pages deployment
  if (process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true') {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (appUrl) {
      return appUrl;
    }
    // Fallback for GitHub Pages
    return '';
  }
  
  // For other deployments
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // For local development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Default to empty string (relative URLs)
  return '';
}

export function getAbsoluteUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // If no base URL or it's empty, return the path as-is
  if (!baseUrl) {
    return cleanPath;
  }
  
  return `${baseUrl}${cleanPath}`;
}