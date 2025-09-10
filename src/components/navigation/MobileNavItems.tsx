'use client';

import { useState } from 'react';
import { useMobileMenu } from '@/components/layouts/BaseTemplate';
import { LocaleLink } from '@/components/common/LocaleLink';
import { ChevronDown } from 'lucide-react';

export function MobileNavItems() {
  const { closeMobileMenu } = useMobileMenu();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Loan Products dropdown */}
      <button
        type="button"
        className="w-full px-6 py-4 text-left text-lg font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors border-b border-gray-100 flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>Loan Products</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pl-4">
          <LocaleLink
            href="/business-loans"
            className="block w-full px-6 py-3 text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
            onClick={closeMobileMenu}
          >
            Business Loans
          </LocaleLink>
          <LocaleLink
            href="/investment-loans"
            className="block w-full px-6 py-3 text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
            onClick={closeMobileMenu}
          >
            Investment Loans
          </LocaleLink>
          <LocaleLink
            href="/off-the-plan-purchases"
            className="block w-full px-6 py-3 text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
            onClick={closeMobileMenu}
          >
            Off-the-Plan Purchases
          </LocaleLink>
        </div>
      )}

      {/* Other links */}
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
