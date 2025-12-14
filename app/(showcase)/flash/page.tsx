import type { Metadata } from "next";

import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";
import { getFlash } from "@/lib/sanity/sanity-api";
import { JsonLd } from "@/components/seo/json-ld";

import { fetchMoreFlashImages } from "./actions";

import { siteConfig } from "@/config/site";

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
    title: "Flash Tattoo Designs | Ace Arts",
    description:
      "Browse available flash tattoo designs by Ace Arts. Bold, colorful American traditional tattoo art ready to be inked in Cedar Rapids, Iowa.",
    url: "https://acearts.com/flash",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash Tattoo Designs | Ace Arts",
    description:
      "Browse available flash tattoo designs. Bold, colorful traditional tattoo art.",
  },
  alternates: {
    canonical: "https://acearts.com/flash",
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

export const revalidate = 3600;

export default async function FlashPage() {
  const { items, totalCount } = await getFlash(0, 9);

  return (
    <>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <main>
        <JsonLd data={breadcrumbJsonLd} />
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
