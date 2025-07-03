import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import { BaseTemplate } from '@/components/layouts/BaseTemplate';
import { LocaleLink } from '@/components/common/LocaleLink';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://realtydirect.com.au'),
  title: {
    default: 'Realty Direct | Real Estate Agency Queensland',
    template: '%s | Realty Direct',
  },
  description: "Queensland's most flexible real estate platform. Professional property services across Brisbane and Gold Coast.",
  keywords: 'real estate queensland, property brisbane, homes gold coast, real estate agency, properties queensland',
  openGraph: {
    type: 'website',
    siteName: 'Realty Direct',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navItems = (
  <>
    <LocaleLink
      href="/buying"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Buying
    </LocaleLink>
    <LocaleLink
      href="/selling"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Selling
    </LocaleLink>
    <LocaleLink
      href="/renting"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Renting
    </LocaleLink>
    <LocaleLink
      href="/about"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      About
    </LocaleLink>
    <LocaleLink
      href="/contact"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Contact
    </LocaleLink>
  </>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <PostHogProvider>
          <BaseTemplate navItems={navItems}>
            {children}
          </BaseTemplate>
        </PostHogProvider>
      </body>
    </html>
  );
}