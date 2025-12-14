import type { Metadata } from "next";

import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { JsonLd } from "@/components/seo/json-ld";

import { fetchMoreRecentWork } from "./actions";

import { siteConfig } from "@/config/site";
import { CACHE_CONFIG } from "@/config/cache";

export const metadata: Metadata = {
  title: "Recent Tattoo Work",
  description:
    "View recent tattoo work by Alexis Nesteby at Neon Dragon Tattoo. Custom tattoo pieces featuring bold lines, vibrant colors, and American traditional style in Cedar Rapids, Iowa.",
  keywords: [
    "recent tattoo work",
    "tattoo portfolio",
    "custom tattoo examples",
    "healed tattoos",
    "tattoo gallery",
    "Cedar Rapids tattoo portfolio",
    "traditional tattoo examples",
    "Ace Arts portfolio",
  ],
  openGraph: {
    images: ["/api/og?title=Recent%20Tattoo%20Work"],
    title: "Recent Tattoo Work | Ace Arts",
    description:
      "View recent tattoo work by Alexis Nesteby. Custom pieces featuring bold lines, vibrant colors, and American traditional style.",
    url: `${siteConfig.url}/recent`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recent Tattoo Work | Ace Arts",
    description:
      "View recent custom tattoo work featuring bold lines and vibrant colors.",
  },
  alternates: {
    canonical: `${siteConfig.url}/recent`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Recent Work",
      item: `${siteConfig.url}/recent`,
    },
  ],
};

export const revalidate = CACHE_CONFIG.default;

export default async function RecentWorkPage() {
  const { items, totalCount } = await getRecentWork(0, 24);

  const imageGalleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Recent Tattoo Work Portfolio by Ace Arts",
    description: metadata.description,
    creator: {
      "@type": "Person",
      name: siteConfig.artist.name,
      jobTitle: siteConfig.artist.jobTitle,
      worksFor: {
        "@type": "TattooParlor",
        name: siteConfig.business.shop,
      },
    },
    thumbnailUrl: items.slice(0, 1).map((item) => item.imageUrl),
    image: items.slice(0, 12).map((item) => ({
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

  // Portfolio/Visual Artwork Collection
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: "Tattoo Portfolio",
    description: "Portfolio of custom tattoo work by Alexis Nesteby (Ace Arts)",
    collectionSize: totalCount,
    creator: {
      "@type": "Person",
      name: siteConfig.artist.name,
      jobTitle: siteConfig.artist.jobTitle,
      description: siteConfig.artist.bio,
    },
    itemListElement: items.slice(0, 10).map((item, index) => ({
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

  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={imageGalleryJsonLd} />
        <JsonLd data={portfolioJsonLd} />
        <section className="container lg:px-0">
          <InfiniteScrollShowcase
            label="Recent Work"
            initialData={items}
            fetchData={fetchMoreRecentWork}
            totalCount={totalCount}
            imageRatio={3 / 4}
          />
        </section>
      </main>
    </>
  );
}
