'use client';

import Script from 'next/script';

interface GoogleMapsLoaderProps {
  apiKey: string;
  libraries?: string[];
  children: React.ReactNode;
}

export const GoogleMapsLoader = ({
  apiKey,
  libraries = ['places'],
  children,
}: GoogleMapsLoaderProps) => {
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Maps script loaded');
          }
        }}
        onError={(e) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error loading Google Maps:', e);
          }
        }}
      />
      {children}
    </>
  );
};
