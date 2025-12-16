import type { Metadata } from "next";

import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { JsonLd } from "@/components/seo/json-ld";

import { fetchMoreRecentWork } from "./actions";

import { siteConfig } from "@/config/site";
import { INITIAL_FETCH_SIZE } from "@/config/cache";

import {
  createBreadcrumbJsonLd,
  createPortfolioJsonLd,
  createRecentWorkGalleryJsonLd,
} from "@/lib/json-ld";

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

export const revalidate = 3600;

export default async function RecentWorkPage() {
  const { items, totalCount } = await getRecentWork(0, INITIAL_FETCH_SIZE);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Recent Work", path: "/recent" },
  ]);

  const imageGalleryJsonLd = createRecentWorkGalleryJsonLd({
    description: metadata.description as string,
    images: items,
    totalCount,
  });

  const portfolioJsonLd = createPortfolioJsonLd(items, totalCount);

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
