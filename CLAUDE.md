# Claude AI Development Guidelines
This document outlines the development standards and best practices for creating a beautiful, highly SEO-optimized real estate website for Realty Direct.

## 🎯 Primary Objectives

**SEO Excellence**: All development must prioritize search engine optimization for maximum visibility in Queensland property searches
**Visual Appeal**: Create a stunning, modern design that captivates visitors and builds trust
**Perfect Performance**: Target 100/100 Lighthouse scores across all metrics
**Mobile-First Beauty**: Design breathtaking mobile experiences that scale beautifully to desktop
**Type Safety**: Full TypeScript implementation for robust, maintainable code

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.3** with App Router for superior SEO and performance
- **TypeScript** with strict mode for bulletproof code
- **Tailwind CSS** for beautiful, utility-first styling with custom design system

### Essential Tools
- **next/image** - Optimized image loading with lazy loading
- **next/font** - Perfect font optimization and loading
- **Framer Motion** - Smooth, professional animations and transitions
- **Lucide React** - Beautiful, consistent iconography
- **React Hook Form + Zod** - Elegant forms with bulletproof validation

### Performance & SEO
- **Dynamic imports** - Smart code splitting for faster loads
- **React Suspense** - Elegant loading states
- **ISR/SSG** - Static generation for lightning-fast performance
- **Structured data** - Rich snippets for better search visibility

## 📋 Development Standards

### 1. SEO Excellence

**Comprehensive Metadata for Every Page:**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Luxury Properties Queensland | Realty Direct',
    description: 'Discover premium real estate in Queensland. Professional property listings, expert guidance, and innovative real estate solutions across Brisbane and Gold Coast.',
    keywords: 'Queensland real estate, Brisbane properties, Gold Coast homes, property listings, real estate agent',
    openGraph: {
      title: 'Luxury Properties Queensland | Realty Direct',
      description: 'Discover premium real estate in Queensland',
      url: 'https://realtydirect.com.au',
      siteName: 'Realty Direct',
      images: [{
        url: 'https://realtydirect.com.au/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Realty Direct'
      }],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Luxury Properties Queensland | Realty Direct',
      description: 'Discover premium real estate in Queensland',
      images: ['https://realtydirect.com.au/twitter-image.jpg'],
    },
    alternates: {
      canonical: 'https://realtydirect.com.au'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

**Rich Structured Data:**
```typescript
const propertyStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  'name': 'Realty Direct',
  'description': 'Premium real estate services in Queensland',
  'url': 'https://realtydirect.com.au',
  'logo': 'https://realtydirect.com.au/logo.png',
  'image': 'https://realtydirect.com.au/hero-image.jpg',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Main Beach',
    'addressLocality': 'Gold Coast',
    'addressRegion': 'Queensland',
    'postalCode': '4217',
    'addressCountry': 'AU'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '-27.9975',
    'longitude': '153.4297'
  },
  'telephone': '+61-XXX-XXX-XXX',
  'priceRange': '$$',
  'servesCuisine': 'Real Estate Services',
  'areaServed': ['Queensland', 'Brisbane', 'Gold Coast']
};
```

**Perfect URL Structure:**
- `/properties/brisbane/luxury-apartments`
- `/properties/gold-coast/beachfront-homes`
- `/services/for-sale-by-owner`
- `/agents/independent-real-estate-services`

### 2. Stunning Visual Design

**Modern Color Palette:**
```css
:root {
  /* Professional Brand Colors */
  --primary-900: #102542; /* Deep Navy */
  --primary-800: #223354; /* Muted Navy */
  --primary-700: #345075; /* Slate Blue */
  --primary-600: #4b6a88; /* Cool Blue */
  --primary-500: #7a99b8; /* Light Blue */

  /* Silver & Accent Colors */
  --accent-700: #b0b7bd; /* Silver Gray */
  --accent-600: #d1d5db; /* Light Silver */
  --accent-500: #f3f4f6; /* Off White */

  /* Modern Neutrals */
  --slate-900: #181c20; /* Charcoal */
  --slate-800: #23272b; /* Dark Gray */
  --slate-700: #374151; /* Medium Gray */
  --slate-600: #6b7280; /* Text Gray */
  --slate-100: #f8fafc; /* Light Background */
  --white: #ffffff; /* Pure White */

  /* Status Colors */
  --success: #198754; /* Professional Green */
  --warning: #f59e42; /* Amber */
  --error: #dc3545; /* Red */
}
```

**Typography System:**
```css
/* Import premium fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');

:root {
  /* Primary Font - Inter (Modern, Clean) */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Display Font - Playfair Display (Elegant, Luxury) */
  --font-display: 'Playfair Display', Georgia, serif;

  /* Font Sizes */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
  --text-6xl: 3.75rem; /* 60px */
}
```

**Component Design Patterns:**
```tsx
// Hero Section with Stunning Visuals
const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background Video/Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero-luxury-property.jpg"
        alt="Luxury Queensland Property"
        fill
        className="object-cover"
        priority
        quality={95}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent" />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <motion.h1
        className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Luxury Living
        <span className="block text-gold-400">Redefined</span>
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Queensland's most exclusive properties with innovative real estate solutions
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size="lg" variant="primary">
          Explore Properties
        </Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </motion.div>
    </div>
  </section>
);

// Premium Property Card
const PropertyCard = ({ property }) => (
  <motion.div
    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    whileHover={{ y: -8 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {/* Property Image */}
    <div className="relative h-64 overflow-hidden">
      <Image
        src={property.image}
        alt={property.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Premium Badge */}
      {property.featured && (
        <div className="absolute top-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      )}

      {/* Price Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <span className="font-display text-xl font-bold text-slate-900">
          {property.price}
        </span>
      </div>
    </div>

    {/* Property Details */}
    <div className="p-6">
      <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
        {property.title}
      </h3>
      <p className="text-slate-600 mb-4 flex items-center">
        <MapPin className="w-4 h-4 mr-2" />
        {property.location}
      </p>

      {/* Property Features */}
      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
        <span className="flex items-center">
          <Bed className="w-4 h-4 mr-1" />
          {property.bedrooms}
        </span>
        <span className="flex items-center">
          <Bath className="w-4 h-4 mr-1" />
          {property.bathrooms}
        </span>
        <span className="flex items-center">
          <Square className="w-4 h-4 mr-1" />
          {property.area}
          m²
        </span>
      </div>

      <Button variant="outline" className="w-full group-hover:bg-primary-700 group-hover:text-white transition-colors">
        View Details
      </Button>
    </div>
  </motion.div>
);
```

### 3. Performance Optimization

**Perfect Image Handling:**
```tsx
// Optimized image component with blur placeholder
const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}
    </div>
  );
};

// Lazy load heavy components
const PropertyMap = dynamic(() => import('./PropertyMap'), {
  loading: () => (
    <div className="h-96 bg-slate-100 rounded-lg animate-pulse flex items-center justify-center">
      <MapPin className="w-8 h-8 text-slate-400" />
    </div>
  ),
  ssr: false
});
```

**Code Splitting Strategy:**
```typescript
// Page-level code splitting
const PropertyListings = dynamic(() => import('@/components/PropertyListings'));
const ContactForm = dynamic(() => import('@/components/ContactForm'));
const PropertySearch = dynamic(() => import('@/components/PropertySearch'));

// Component-level lazy loading
const LazyPropertyGallery = lazy(() => import('./PropertyGallery'));
const LazyVirtualTour = lazy(() => import('./VirtualTour'));
```

### 4. Mobile-First Beautiful Design

**Responsive Layout Patterns:**
```tsx
// Mobile-first grid system
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {properties.map(property => (
    <PropertyCard key={property.id} property={property} />
  ))}
</div>

// Responsive typography
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold">
  Premium Properties
</h1>

// Mobile navigation
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
  <div className="grid grid-cols-4 gap-1">
    {navItems.map(item => (
      <Link
        key={item.name}
        href={item.href}
        className="flex flex-col items-center py-3 px-2 text-slate-600 hover:text-primary-700"
      >
        <item.icon className="w-5 h-5 mb-1" />
        <span className="text-xs">{item.name}</span>
      </Link>
    ))}
  </div>
</nav>
```

### 5. Beautiful Animations

**Smooth Page Transitions:**
```tsx
import { AnimatePresence, motion } from 'framer-motion';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Stagger children animation
const PropertyGrid = ({ properties }) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
  >
    {properties.map((property, index) => (
      <motion.div
        key={property.id}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <PropertyCard property={property} />
      </motion.div>
    ))}
  </motion.div>
);
```

### 6. Advanced SEO Implementation

**Dynamic Sitemap Generation:**
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties();

  const propertyUrls = properties.map(property => ({
    url: `https://realtydirect.com.au/properties/${property.slug}`,
    lastModified: property.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://realtydirect.com.au',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://realtydirect.com.au/properties',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...propertyUrls,
  ];
}
```

**Rich Snippets for Properties:**
```typescript
const generatePropertySchema = (property: Property) => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  'name': property.title,
  'description': property.description,
  'url': `https://realtydirect.com.au/properties/${property.slug}`,
  'image': property.images.map(img => img.url),
  'datePosted': property.listedDate,
  'validThrough': property.expiryDate,
  'price': {
    '@type': 'MonetaryAmount',
    'value': property.price,
    'currency': 'AUD'
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': property.address,
    'addressLocality': property.suburb,
    'addressRegion': 'Queensland',
    'addressCountry': 'AU'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': property.latitude,
    'longitude': property.longitude
  },
  'floorSize': {
    '@type': 'QuantitativeValue',
    'value': property.floorArea,
    'unitText': 'square meter'
  },
  'numberOfRooms': property.bedrooms,
  'numberOfBathroomsTotal': property.bathrooms
});
```

## 🎨 Component Library

### Button Component
```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-400 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white focus:ring-primary-500',
    ghost: 'text-slate-600 hover:text-primary-700 hover:bg-slate-100'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Search Component
```tsx
const PropertySearch = () => (
  <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 text-center">
      Find Your Dream Property
    </h2>

    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Brisbane, Gold Coast..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Property Type
        </label>
        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option>House</option>
          <option>Apartment</option>
          <option>Townhouse</option>
          <option>Land</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Price Range
        </label>
        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option>Any Price</option>
          <option>Under $500k</option>
          <option>$500k - $1M</option>
          <option>$1M - $2M</option>
          <option>$2M+</option>
        </select>
      </div>

      <div className="flex items-end">
        <Button variant="primary" className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  </div>
);
```

## 🚀 Deployment & Performance

### Core Web Vitals Optimization
```typescript
// Image optimization with priorities
const PropertyHero = ({ property }) => (
  <div className="relative h-96 md:h-[60vh]">
    <Image
      src={property.heroImage}
      alt={property.title}
      fill
      className="object-cover"
      priority
      quality={95}
      sizes="100vw"
    />
  </div>
)

// Preload critical resources
export default function PropertyPage({ property }) {
  useEffect(() => {
    // Preload next property images
    const preloadNextProperty = () => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = `/api/properties/${property.id + 1}/images`
      document.head.appendChild(link)
    }

    preloadNextProperty()
  }, [property.id])

  return <PropertyDetails property={property} />
}
```

### Perfect Lighthouse Scores Checklist

#### Performance (100/100)
- ✅ First Contentful Paint < 1.8s
- ✅ Largest Contentful Paint < 2.5s
- ✅ First Input Delay < 100ms
- ✅ Cumulative Layout Shift < 0.1
- ✅ Image optimization with next/image
- ✅ Font optimization with next/font
- ✅ Code splitting and lazy loading
- ✅ Compressed assets (WebP, AVIF)

#### SEO (100/100)
- ✅ Semantic HTML structure
- ✅ Meta descriptions for all pages
- ✅ Proper heading hierarchy
- ✅ Alt text for all images
- ✅ Clean URL structure
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Structured data markup

#### Accessibility (100/100)
- ✅ Color contrast ratios > 4.5:1
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ ARIA labels where needed
- ✅ Focus indicators
- ✅ Alternative text for images

#### Best Practices (100/100)
- ✅ HTTPS everywhere
- ✅ No console errors
- ✅ Secure cross-origin requests
- ✅ Optimized images
- ✅ Modern JavaScript

## 🔧 Biome Configuration

Follow these Biome rules for consistent, clean code:

```json
{
  "linter": {
    "rules": {
      "style": {
        "useTemplate": "error",
        "noNonNullAssertion": "warn",
        "useConst": "error"
      },
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error",
        "useHookAtTopLevel": "error"
      },
      "complexity": {
        "noUselessFragments": "error",
        "noForEach": "error"
      },
      "suspicious": {
        "noArrayIndexKey": "warn",
        "noConsoleLog": "warn"
      }
    }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  }
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (routes)/          # Route groups
│   │   ├── properties/    # Property pages
│   │   ├── services/      # Service pages
│   │   └── about/         # About pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── property/         # Property-specific components
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   └── PropertySearch.tsx
│   └── sections/         # Page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── Testimonials.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── types/                # TypeScript type definitions
└── styles/               # Additional styles
```

## 🎯 Key Success Metrics

- **Lighthouse Performance**: 100/100
- **Lighthouse SEO**: 100/100
- **Lighthouse Accessibility**: 100/100
- **Lighthouse Best Practices**: 100/100
- **Core Web Vitals**: All green
- **Mobile Friendliness**: Perfect score
- **Search Console**: Zero indexing issues
- **Page Speed**: < 2s load time
- **Conversion Rate**: Optimized for lead generation

Remember: Every line of code should contribute to creating a visually stunning, lightning-fast, and highly discoverable real estate website that converts visitors into clients.
