'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import Script from 'next/script';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected?: (place: any) => void;
  placeholder?: string;
  className?: string;
}

export const AddressAutocomplete = ({
  value,
  onChange,
  onPlaceSelected,
  placeholder = "Enter your property address",
  className = ""
}: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [shouldLoadMaps, setShouldLoadMaps] = useState(false);

  // Check if Google Maps is already loaded
  const isGoogleMapsLoaded = () => {
    return typeof window !== 'undefined' && 
           (window as any).google && 
           (window as any).google.maps && 
           (window as any).google.maps.places;
  };

  // Load Google Maps when component becomes active (user clicks on input)
  const handleInputFocus = () => {
    if (isGoogleMapsLoaded()) {
      // If already loaded, initialize immediately
      setScriptsLoaded(true);
      setShouldLoadMaps(true);
    } else {
      // If not loaded, trigger loading
      setShouldLoadMaps(true);
    }
  };

  // Check on mount if Google Maps is already available
  useEffect(() => {
    if (isGoogleMapsLoaded()) {
      setScriptsLoaded(true);
    }
  }, []);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;
    
    const tryInitialize = () => {
      if (isGoogleMapsLoaded() && !autocompleteRef.current) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Google Maps API is loaded, initializing autocomplete');
        }
        initializeAutocomplete();
        return true;
      }
      return false;
    };

    // Initialize if Google Maps is available and we should load maps
    if (shouldLoadMaps) {
      if (isGoogleMapsLoaded()) {
        // Google Maps is already loaded, initialize immediately
        tryInitialize();
      } else if (scriptsLoaded) {
        // Scripts were loaded but Google Maps might not be ready yet, wait for it
        if (!tryInitialize()) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Maps API not loaded yet, waiting...');
          }
          checkInterval = setInterval(() => {
            if (tryInitialize() && checkInterval) {
              clearInterval(checkInterval);
            }
          }, 100);
        }
      }
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (autocompleteRef.current && (window as any).google) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [scriptsLoaded, shouldLoadMaps]);

  const initializeAutocomplete = () => {
    if (!inputRef.current) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Input ref not available');
      }
      return;
    }

    // Prevent double initialization
    if (autocompleteRef.current) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Autocomplete already initialized');
      }
      return;
    }

    try {
      // Verify Google Maps API is available
      if (!(window as any).google?.maps?.places?.Autocomplete) {
        throw new Error('Google Maps Places API not available');
      }

      // Create autocomplete instance
      autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'au' }, // Restrict to Australia
        fields: ['address_components', 'geometry', 'formatted_address', 'place_id'],
        types: ['address'] // Focus on addresses
      });

      // Add place changed listener
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
          if (onPlaceSelected) {
            onPlaceSelected(place);
          }
        }
      });
    } catch (error) {
      console.error('Error initializing Google Places autocomplete:', error);
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Fallback for missing API key in production
  const effectiveApiKey = apiKey || 'AIzaSyC1-DPGwZgccZMJDStZicFyXFw-TZhLurI';


  return (
    <>
      {/* Conditionally load Google Maps Scripts */}
      {shouldLoadMaps && effectiveApiKey && !isGoogleMapsLoaded() && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${effectiveApiKey}&libraries=places`}
          strategy="afterInteractive"
          onLoad={() => {
            setScriptsLoaded(true);
          }}
          onError={(e) => {
            console.error('Error loading Google Maps script:', e);
          }}
        />
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleInputFocus}
          className={`w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
          autoComplete="off"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {/* Add global styles for Google Autocomplete */}
      <style jsx global>{`
        .pac-container {
          z-index: 10000 !important;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .pac-item {
          padding: 12px 16px;
          cursor: pointer;
          font-size: 14px;
        }
        .pac-item:hover {
          background-color: #f3f4f6;
        }
        .pac-item-query {
          font-weight: 600;
        }
      `}</style>
    </>
  );
};