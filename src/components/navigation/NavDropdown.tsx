import { LocaleLink } from '@/components/common/LocaleLink';
import { ChevronDown } from 'lucide-react';
import React from 'react';

export function NavDropdown() {
  return (
    <div className="relative group">
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md text-sm md:text-base font-medium transition-colors whitespace-nowrap"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        Loan Products
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div
        className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-20"
        role="menu"
      >
        <div className="py-2">
          <LocaleLink
            href="/business-loans"
            className="block px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 whitespace-nowrap"
          >
            Business Loans
          </LocaleLink>
          <LocaleLink
            href="/investment-loans"
            className="block px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 whitespace-nowrap"
          >
            Investment Loans
          </LocaleLink>
          <LocaleLink
            href="/off-the-plan-purchases"
            className="block px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 whitespace-nowrap"
          >
            Off-the-Plan Purchases
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}

