import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { LocaleLink } from '@/components/common/LocaleLink';
import { BaseTemplate } from '@/components/layouts/BaseTemplate';
import { MobileNavItems } from '@/components/navigation/MobileNavItems';
import '@/styles/global.css';
import { getAssetPath } from '@/utils/Helpers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'AAGT Private Loans | Fast Business Funding Australia',
    template: '%s | AAGT Private Loans',
  },
  description:
    'AAGT Private Loans provides direct business funding from $150,000 to $5,000,000. Fast approvals, competitive rates, and flexible terms. Explore alternative lending solutions today.',
  keywords:
    'private loans Australia, business loans fast approval, private lending Queensland, same day loan approval, off the plan finance, bank rejected loan alternative, quick business funding, second mortgage lender, 4 day loan settlement, private funder direct',
  icons: {
    icon: [
      { url: getAssetPath('/favicon-16x16.png'), sizes: '16x16', type: 'image/png' },
      { url: getAssetPath('/favicon-32x32.png'), sizes: '32x32', type: 'image/png' },
      { url: getAssetPath('/favicon.ico'), sizes: 'any' },
    ],
    apple: getAssetPath('/apple-touch-icon.png'),
  },
  openGraph: {
    type: 'website',
    siteName: 'AAGT Private Loans',
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

// Desktop navigation with all links
const desktopNavItems = (
  <>
    <LocaleLink
      href="/"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Home
    </LocaleLink>
    <LocaleLink
      href="/business-loans"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Business Loans
    </LocaleLink>
    <LocaleLink
      href="/investment-loans"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Investment Loans
    </LocaleLink>
    <LocaleLink
      href="/off-the-plan-purchases"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Off-the-Plan Purchases
    </LocaleLink>
    <LocaleLink
      href="/rates"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Rates
    </LocaleLink>
    <LocaleLink
      href="/about"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      About Us
    </LocaleLink>
    <LocaleLink
      href="/contact"
      className="block px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Contact Us
    </LocaleLink>
  </>
);

const navItems = desktopNavItems;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="theme-color" content="#0891B2" />
      </head>
      <body>
        <PostHogProvider>
          <BaseTemplate navItems={navItems} mobileNavItems={<MobileNavItems />}>
            {children}
          </BaseTemplate>
        </PostHogProvider>
      </body>
    </html>
  );
}
