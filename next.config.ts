import type { NextConfig } from 'next';

// Define the base Next.js configuration
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Uncomment and update if your repo is not at the root (e.g., https://username.github.io/repo-name)
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['@electric-sql/pglite'],
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Enable optimizations for better performance
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Performance optimizations
  compress: true,
};

export default nextConfig;
