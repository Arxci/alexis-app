import type { Metadata } from "next";

import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { JsonLd } from "@/components/seo/json-ld";

import { fetchMoreRecentWork } from "./actions";

import { siteConfig } from "@/config/site";

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
    title: "Recent Tattoo Work | Ace Arts",
    description:
      "View recent tattoo work by Alexis Nesteby. Custom pieces featuring bold lines, vibrant colors, and American traditional style.",
    url: "https://acearts.com/recent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recent Tattoo Work | Ace Arts",
    description:
      "View recent custom tattoo work featuring bold lines and vibrant colors.",
  },
  alternates: {
    canonical: "https://acearts.com/recent",
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

export const revalidate = 3600;

export default async function RecentWorkPage() {
  const { items, totalCount } = await getRecentWork(0, 9);

  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd} />
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
