import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import { BaseTemplate } from '@/components/layouts/BaseTemplate';
import { LocaleLink } from '@/components/common/LocaleLink';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aagtprivateloans.com.au'),
  title: {
    default: 'AAGT Private Loans | Fast Business Funding Australia',
    template: '%s | AAGT Private Loans',
  },
  description: "AAGT Private Loans offers fast business funding from $150k-$5M. Same day approval, 4-day settlement. Direct funder with competitive rates. Apply now! 🚀",
  keywords: 'private loans Australia, business loans fast approval, private lending Sydney, same day loan approval, off the plan finance, bank rejected loan alternative, quick business funding, second mortgage lender, 4 day loan settlement, private funder direct',
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

const navItems = (
  <>
    <LocaleLink
      href="/business-loans"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Business Loans
    </LocaleLink>
    <LocaleLink
      href="/investment-loans"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Investment Loans
    </LocaleLink>
    <LocaleLink
      href="/rates"
      className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md text-sm md:text-base font-medium transition-colors"
    >
      Rates & Fees
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