import Link from 'next/link';
import { forwardRef } from 'react';

interface LocaleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <Link ref={ref} href={href} {...props}>
        {children}
      </Link>
    );
  }
);

LocaleLink.displayName = 'LocaleLink';

// Helper function to get href (no longer needs localization)
export const getLocalizedHref = (href: string): string => {
  return href;
};
