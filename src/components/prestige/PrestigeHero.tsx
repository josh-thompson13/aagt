'use client';

import { AddressAutocomplete } from '@/components/common/AddressAutocomplete';
import { getAssetPath } from '@/utils/Helpers';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const PrestigeHero = () => {
  const [address, setAddress] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      // Encode the address for URL
      const encodedAddress = encodeURIComponent(address);
      // Navigate to estimate page with address as query parameter
      router.push(`/estimate?address=${encodedAddress}`);
    }
  };

  const handlePlaceSelected = (place: any) => {
    // You can access additional place details here
    if (process.env.NODE_ENV === 'development') {
      console.log('Place selected:', place);
    }
  };

  // Timeout fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true);
        setImageError(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [imageLoaded]);

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Error State - Show content anyway */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700"></div>
      )}

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Responsive image with WebP support */}
        <picture className="absolute inset-0">
          <source 
            media="(max-width: 768px)" 
            srcSet={`${getAssetPath("/images/lisa-anna-hero-800.webp")}`}
            type="image/webp"
          />
          <source 
            media="(max-width: 1200px)" 
            srcSet={`${getAssetPath("/images/lisa-anna-hero-1200.webp")}`}
            type="image/webp"
          />
          <source 
            srcSet={`${getAssetPath("/images/lisa-anna-hero-1920.webp")}`}
            type="image/webp"
          />
          <source 
            media="(max-width: 768px)" 
            srcSet={`${getAssetPath("/images/lisa-anna-hero-800.jpg")}`}
            type="image/jpeg"
          />
          <source 
            media="(max-width: 1200px)" 
            srcSet={`${getAssetPath("/images/lisa-anna-hero-1200.jpg")}`}
            type="image/jpeg"
          />
          <img
            src={getAssetPath("/images/lisa-anna-hero-1920.jpg")}
            alt="Queensland property"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          {/* Main Content Card */}
          <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Get an Instant Property Estimate
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 mb-10 font-normal">
              Discover your property's value with our free, instant estimate tool
            </p>

            {/* Address Input Form */}
            <form onSubmit={handleEstimate} className="mb-6 space-y-4">
              <AddressAutocomplete
                value={address}
                onChange={setAddress}
                onPlaceSelected={handlePlaceSelected}
                className="bg-white"
              />
              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-base font-semibold rounded-lg text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                  disabled={!address}
                >
                  Get Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Additional CTAs */}
            <p className="text-slate-600 mt-8 text-sm">
              Or explore our services:
              <a
                href="/buying"
                className="mx-2 text-primary-600 hover:text-primary-700 underline"
              >
                Buying
              </a>
              •
              <a
                href="/selling"
                className="mx-2 text-primary-600 hover:text-primary-700 underline"
              >
                Selling
              </a>
              •
              <a
                href="/renting"
                className="mx-2 text-primary-600 hover:text-primary-700 underline"
              >
                Renting
              </a>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
