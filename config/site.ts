export const siteConfig = {
  name: "Ace Arts",
  description:
    "Custom tattoo art and flash designs by Alexis Nesteby, a tattoo artist based in Cedar Rapids, Iowa. Specializing in bold, colorful traditional work.",
  url: "https://acearts.com", // TODO: Replace with your actual domain
  ogImage: "https://acearts.com/og-image.jpg", // TODO: Create 1200x630px image

  // Business Info
  business: {
    name: "Ace Arts",
    legalName: "Ace Arts Tattoo", // If different
    shop: "Neon Dragon Tattoo & Art Collective",
    priceRange: "$$", // $ = cheap, $$ = moderate, $$$ = expensive, $$$$ = luxury
  },

  // Location Info
  location: {
    city: "Cedar Rapids",
    state: "Iowa",
    stateCode: "IA",
    country: "United States",
    countryCode: "US",
    latitude: 41.9779, // Cedar Rapids coordinates
    longitude: -91.6656,
  },

  // Artist Info
  artist: {
    name: "Alexis Nesteby",
    nickname: "Lexi",
    jobTitle: "Tattoo Artist",
    bio: "Specializing in bold, colorful American traditional tattoo work inspired by pop culture, metal music, and tattoo history.",
  },

  // Social Links
  links: {
    instagram: "https://instagram.com/ace_arts30",
    // TODO: Add these if you have them
    // facebook: "https://facebook.com/acearts",
    // tiktok: "https://tiktok.com/@ace_arts30",
    // email: "mailto:hello@acearts.com",
    // phone: "tel:+13195551234",
  },

  //Contact (optional)
  contact: {
    email: "hello@acearts.com",
    phone: "+1 (319) 555-1234",
  },

  // Site Navigation
  siteMap: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Flash", href: "/flash" },
    { name: "Recent Work", href: "/recent" },
    // { name: "Contact", href: "/contact" }, // TODO: Add if you create a contact page
  ],

  // SEO Keywords
  keywords: {
    location: [
      "Cedar Rapids tattoo artist",
      "Iowa tattoo artist",
      "tattoo artist near me",
      "Cedar Rapids tattoo shop",
      "Neon Dragon Tattoo",
      "Iowa City tattoo",
      "Eastern Iowa tattoo",
    ],
    style: [
      "traditional tattoo",
      "American traditional tattoo",
      "bold tattoo designs",
      "colorful tattoo art",
      "neo traditional tattoo",
      "flash tattoo designs",
      "custom tattoo designs",
      "tattoo flash art",
    ],
    service: [
      "custom tattoo",
      "tattoo consultation",
      "walk-in tattoo",
      "tattoo appointments",
      "first tattoo",
      "tattoo cover up",
    ],
    artist: [
      "Alexis Nesteby",
      "Lexi tattoo artist",
      "Ace Arts tattoo",
      "female tattoo artist",
      "women tattoo artist Iowa",
    ],
    theme: [
      "pop culture tattoo",
      "metal music tattoo",
      "alternative tattoo art",
      "punk tattoo designs",
      "rock and roll tattoo",
    ],
  },
} as const;

// Helper to get all keywords as flat array
export const getAllKeywords = () => {
  return [
    ...siteConfig.keywords.location,
    ...siteConfig.keywords.style,
    ...siteConfig.keywords.service,
    ...siteConfig.keywords.artist,
    ...siteConfig.keywords.theme,
  ];
};

// JSON-LD structured data generator
export const getJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: siteConfig.business.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: siteConfig.ogImage,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.stateCode,
    addressCountry: siteConfig.location.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.location.latitude.toString(),
    longitude: siteConfig.location.longitude.toString(),
  },
  priceRange: siteConfig.business.priceRange,
  sameAs: Object.values(siteConfig.links).filter(Boolean),
  employee: {
    "@type": "Person",
    name: siteConfig.artist.name,
    jobTitle: siteConfig.artist.jobTitle,
    description: siteConfig.artist.bio,
  },
  // Uncomment when you add contact info
  // "telephone": siteConfig.contact?.phone,
  // "email": siteConfig.contact?.email,
});
