export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // GitHub Pages with custom domain
  if (process.env.GITHUB_ACTIONS) {
    return 'https://aagtprivateloans.com.au';
  }

  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string) => {
  return url;
};

export const getAssetPath = (path: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // If path already starts with base path, return as is
  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  
  // If path is absolute and we have a base path, prepend it
  if (basePath && path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  
  return path;
};
