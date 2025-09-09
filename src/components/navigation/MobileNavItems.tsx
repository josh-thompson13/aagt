'use client';

import { useMobileMenu } from '@/components/layouts/BaseTemplate';
import { LocaleLink } from '@/components/common/LocaleLink';

export function MobileNavItems() {
  const { closeMobileMenu } = useMobileMenu();
  
  return (
    <>
      <LocaleLink
        href="/"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100"
        onClick={closeMobileMenu}
      >
        Home
      </LocaleLink>
      <LocaleLink
        href="/business-loans"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100"
        onClick={closeMobileMenu}
      >
        Business Loans
      </LocaleLink>
      <LocaleLink
        href="/investment-loans"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100"
        onClick={closeMobileMenu}
      >
        Investment Loans
      </LocaleLink>
      <LocaleLink
        href="/off-the-plan-purchases"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100"
        onClick={closeMobileMenu}
      >
        Off-the-Plan Purchases
      </LocaleLink>
      <LocaleLink
        href="/rates"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100"
        onClick={closeMobileMenu}
      >
        Rates
      </LocaleLink>
      <LocaleLink
        href="/about"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100"
        onClick={closeMobileMenu}
      >
        About Us
      </LocaleLink>
      <LocaleLink
        href="/contact"
        className="block w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors"
        onClick={closeMobileMenu}
      >
        Contact Us
      </LocaleLink>
    </>
  );
}
