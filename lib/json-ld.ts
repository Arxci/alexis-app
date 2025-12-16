// lib/json-ld.ts
import { siteConfig } from "@/config/site";
import { ImageItem } from "@/lib/sanity/sanity-api";

// ============================================
// Breadcrumb JSON-LD
// ============================================

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `${siteConfig.url}${item.path}` : siteConfig.url,
    })),
  };
}

// ============================================
// Image Gallery JSON-LD
// ============================================

type ImageGalleryOptions = {
  name: string;
  description: string;
  images: ImageItem[];
  totalCount: number;
  includeWorksFor?: boolean;
};

export function createImageGalleryJsonLd({
  name,
  description,
  images,
  totalCount,
  includeWorksFor = false,
}: ImageGalleryOptions) {
  const creator: Record<string, unknown> = {
    "@type": "Person",
    name: siteConfig.artist.name,
    jobTitle: siteConfig.artist.jobTitle,
  };

  if (includeWorksFor) {
    creator.worksFor = {
      "@type": "TattooParlor",
      name: siteConfig.business.shop,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    creator,
    thumbnailUrl: images.slice(0, 1).map((item) => item.imageUrl),
    image: images.slice(0, 12).map((item) => ({
      "@type": "ImageObject",
      contentUrl: item.imageUrl,
      thumbnailUrl: item.thumbUrl,
      description: item.alt || "Tattoo artwork by Ace Arts",
      width: item.dimensions?.width,
      height: item.dimensions?.height,
      creator: {
        "@type": "Person",
        name: siteConfig.artist.name,
      },
    })),
    numberOfItems: totalCount,
  };
}

// ============================================
// Flash Collection JSON-LD
// ============================================

export function createFlashCollectionJsonLd(images: ImageItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Flash Tattoo Design Collection",
    description:
      "Pre-drawn flash tattoo designs available for immediate tattooing",
    author: {
      "@type": "Person",
      name: siteConfig.artist.name,
      jobTitle: siteConfig.artist.jobTitle,
    },
    genre: ["Traditional Tattoo", "American Traditional", "Flash Art"],
    workExample: images.slice(0, 5).map((item) => ({
      "@type": "VisualArtwork",
      name: item.alt || "Flash Tattoo Design",
      image: item.imageUrl,
      artMedium: "Tattoo Design",
      artform: "Traditional Tattoo Art",
    })),
  };
}

// ============================================
// Portfolio Collection JSON-LD
// ============================================

export function createPortfolioJsonLd(images: ImageItem[], totalCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: "Tattoo Portfolio",
    description: `Portfolio of custom tattoo work by ${siteConfig.artist.name} (${siteConfig.name})`,
    collectionSize: totalCount,
    creator: {
      "@type": "Person",
      name: siteConfig.artist.name,
      jobTitle: siteConfig.artist.jobTitle,
      description: siteConfig.artist.bio,
    },
    itemListElement: images.slice(0, 10).map((item, index) => ({
      "@type": "VisualArtwork",
      position: index + 1,
      name: item.alt || `Tattoo Work ${index + 1}`,
      image: item.imageUrl,
      artMedium: "Tattoo",
      artform: "American Traditional Tattoo",
      creator: {
        "@type": "Person",
        name: siteConfig.artist.name,
      },
    })),
  };
}

// ============================================
// Recent Work Gallery JSON-LD (with copyright)
// ============================================

export function createRecentWorkGalleryJsonLd({
  description,
  images,
  totalCount,
}: {
  description: string;
  images: ImageItem[];
  totalCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `Recent Tattoo Work Portfolio by ${siteConfig.name}`,
    description,
    creator: {
      "@type": "Person",
      name: siteConfig.artist.name,
      jobTitle: siteConfig.artist.jobTitle,
      worksFor: {
        "@type": "TattooParlor",
        name: siteConfig.business.shop,
      },
    },
    thumbnailUrl: images.slice(0, 1).map((item) => item.imageUrl),
    image: images.slice(0, 12).map((item) => ({
      "@type": "ImageObject",
      contentUrl: item.imageUrl,
      thumbnailUrl: item.thumbUrl,
      description: item.alt || "Custom tattoo work by Ace Arts",
      width: item.dimensions?.width,
      height: item.dimensions?.height,
      creator: {
        "@type": "Person",
        name: siteConfig.artist.name,
      },
      copyrightHolder: {
        "@type": "Person",
        name: siteConfig.artist.name,
      },
    })),
    numberOfItems: totalCount,
  };
}
