import type { Metadata } from "next";

import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";
import { getFlash } from "@/lib/sanity/sanity-api";
import { JsonLd } from "@/components/seo/json-ld";

import { fetchMoreFlash } from "./actions";

import { siteConfig } from "@/config/site";
import { INITIAL_FETCH_SIZE } from "@/config/cache";

import {
  createBreadcrumbJsonLd,
  createFlashCollectionJsonLd,
  createImageGalleryJsonLd,
} from "@/lib/json-ld";

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

export const revalidate = 3600;

export default async function FlashPage() {
  const { items, totalCount } = await getFlash(0, INITIAL_FETCH_SIZE);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Flash Designs", path: "/flash" },
  ]);

  const imageGalleryJsonLd = createImageGalleryJsonLd({
    name: "Flash Tattoo Designs by Ace Arts",
    description: metadata.description as string,
    images: items,
    totalCount,
  });

  const flashCollectionJsonLd = createFlashCollectionJsonLd(items);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={imageGalleryJsonLd} />
      <JsonLd data={flashCollectionJsonLd} />
      <section className="container lg:px-0">
        <InfiniteScrollShowcase
          label="Flash"
          initialData={items}
          fetchData={fetchMoreFlash}
          totalCount={totalCount}
          imageRatio={16 / 9}
        />
      </section>
    </main>
  );
}
