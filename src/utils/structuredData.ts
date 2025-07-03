export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': 'https://realtydirect.com.au#organization',
  name: 'Realty Direct',
  legalName: 'Realty Direct Pty Ltd',
  url: 'https://realtydirect.com.au',
  logo: 'https://realtydirect.com.au/logo.png',
  image: 'https://realtydirect.com.au/logo.png',
  description: 'Queensland\'s most flexible real estate platform offering DIY, assisted, hybrid, and full-service property sale options.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Eagle Street',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    postalCode: '4000',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.4705,
    longitude: 153.0260,
  },
  telephone: '1300732589',
  email: 'support@realtydirect.com.au',
  faxNumber: '(07) 3123 4568',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
  areaServed: [
    {
      '@type': 'State',
      name: 'Queensland',
      sameAs: 'https://en.wikipedia.org/wiki/Queensland',
    },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -26.4853,
      longitude: 153.0070,
    },
    geoRadius: '500000',
  },
  sameAs: [
    'https://www.facebook.com/realtydirectqld',
    'https://www.linkedin.com/company/realty-direct',
    'https://www.instagram.com/realtydirectqld',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Real Estate Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Do It Yourself (Full FSBO)',
          description: 'Complete control of your property sale with DIY package.',
          url: 'https://realtydirect.com.au/services#diy',
        },
        price: '495',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Assisted For Sale By Owner',
          description: 'Professional support while maintaining control of your sale.',
          url: 'https://realtydirect.com.au/services#assisted',
        },
        price: '1495',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hybrid Solution',
          description: 'Combine agent expertise with DIY savings.',
          url: 'https://realtydirect.com.au/services#hybrid',
        },
        price: '3995',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Professional Agent Listing',
          description: 'Full-service real estate with competitive commission rates.',
          url: 'https://realtydirect.com.au/services#agent',
        },
        price: '1.9',
        priceCurrency: 'PERCENT',
      },
    ],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://realtydirect.com.au#website',
  url: 'https://realtydirect.com.au',
  name: 'Realty Direct',
  description: 'Queensland\'s most flexible real estate platform',
  publisher: {
    '@id': 'https://realtydirect.com.au#organization',
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://realtydirect.com.au/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  ],
  inLanguage: 'en-AU',
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const propertySchema = (property: {
  name: string;
  description: string;
  address: string;
  locality: string;
  region: string;
  postalCode: string;
  price: number;
  numberOfRooms: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  floorSize: number;
  image: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'House',
  name: property.name,
  description: property.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: property.address,
    addressLocality: property.locality,
    addressRegion: property.region,
    postalCode: property.postalCode,
    addressCountry: 'AU',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'AUD',
    price: property.price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@id': 'https://realtydirect.com.au#organization',
    },
  },
  numberOfRooms: property.numberOfRooms,
  numberOfBedrooms: property.numberOfBedrooms,
  numberOfBathrooms: property.numberOfBathrooms,
  floorSize: {
    '@type': 'QuantitativeValue',
    value: property.floorSize,
    unitCode: 'MTK',
  },
  image: property.image,
  url: property.url,
});

export const faqSchema = (questions: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://realtydirect.com.au#localbusiness',
  name: 'Realty Direct Brisbane',
  image: 'https://realtydirect.com.au/brisbane-office.jpg',
  '@graph': [
    {
      '@id': 'https://realtydirect.com.au#organization',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Eagle Street',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    postalCode: '4000',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.4705,
    longitude: 153.0260,
  },
  url: 'https://realtydirect.com.au',
  telephone: '07-3123-4567',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
};