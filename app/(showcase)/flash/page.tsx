import type { Metadata } from "next";

import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";
import { getFlash } from "@/lib/sanity/sanity-api";
import { JsonLd } from "@/components/seo/json-ld";

import { fetchMoreFlashImages } from "./actions";

import { siteConfig } from "@/config/site";
import { CACHE_CONFIG } from "@/config/cache";

export const metadata: Metadata = {
  title: "Flash Tattoo Designs",
  description:
    "Browse available flash tattoo designs by Ace Arts. Bold, colorful American traditional tattoo art ready to be inked. Walk-ins welcome at Neon Dragon Tattoo in Cedar Rapids, Iowa.",
  keywords: [
    "tattoo flash",
    "flash tattoo designs",
    "pre-drawn tattoo designs",
    "traditional flash art",
    "walk-in tattoo designs",
    "available tattoo flash",
    "Cedar Rapids tattoo flash",
    "ready to tattoo designs",
  ],
  openGraph: {
    images: ["/api/og?title=Flash%20Tattoo%20Designs"],
    title: "Flash Tattoo Designs | Ace Arts",
    description:
      "Browse available flash tattoo designs by Ace Arts. Bold, colorful American traditional tattoo art ready to be inked in Cedar Rapids, Iowa.",
    url: `${siteConfig.url}/flash`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash Tattoo Designs | Ace Arts",
    description:
      "Browse available flash tattoo designs. Bold, colorful traditional tattoo art.",
  },
  alternates: {
    canonical: `${siteConfig.url}/flash`,
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
      name: "Flash Designs",
      item: `${siteConfig.url}/flash`,
    },
  ],
};

export const revalidate = CACHE_CONFIG.default;

export default async function FlashPage() {
  const { items, totalCount } = await getFlash(0, 24);

  const imageGalleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Flash Tattoo Designs by Ace Arts",
    description: metadata.description,
    creator: {
      "@type": "Person",
      name: siteConfig.artist.name,
      jobTitle: siteConfig.artist.jobTitle,
    },
    thumbnailUrl: items.slice(0, 1).map((item) => item.imageUrl),
    image: items.slice(0, 12).map((item) => ({
      "@type": "ImageObject",
      contentUrl: item.imageUrl,
      thumbnailUrl: item.thumbUrl,
      description: item.alt || "Flash tattoo design by Ace Arts",
      width: item.dimensions?.width,
      height: item.dimensions?.height,
      creator: {
        "@type": "Person",
        name: siteConfig.artist.name,
      },
    })),
    numberOfItems: totalCount,
  };

  const creativeWorkJsonLd = {
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
    workExample: items.slice(0, 5).map((item) => ({
      "@type": "VisualArtwork",
      name: item.alt || "Flash Tattoo Design",
      image: item.imageUrl,
      artMedium: "Tattoo Design",
      artform: "Traditional Tattoo Art",
    })),
  };

  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={imageGalleryJsonLd} />
        <JsonLd data={creativeWorkJsonLd} />
        <section className="container lg:px-0">
          <InfiniteScrollShowcase
            label="Flash"
            initialData={items}
            fetchData={fetchMoreFlashImages}
            totalCount={totalCount}
            imageRatio={16 / 9}
          />
        </section>
      </main>
    </>
  );
}
