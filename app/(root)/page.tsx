import { Suspense } from "react";

import { HomeAbout } from "./_sections/home-about";
import { HomeBanner } from "./_sections/home-banner";

import { HomeFlash } from "./_sections/home-flash";
import { HomeRecentWork } from "./_sections/home-recent-work";

import { ImageShowcaseSkeleton } from "@/components/image/image-showcase-skeleton";

export const revalidate = 3600;

export default function IndexPage() {
  return (
    <main>
      <HomeBanner />
      <HomeAbout />

      <Suspense
        fallback={
          <section className="container">
            <ImageShowcaseSkeleton
              label="Flash"
              ratio={16 / 9}
              count={3}
              link="/flash"
            />
          </section>
        }
      >
        <HomeFlash />
      </Suspense>

      <Suspense
        fallback={
          <section className="container">
            <ImageShowcaseSkeleton
              label="Recent Work"
              ratio={3 / 4}
              count={3}
              link="/recent"
            />
          </section>
        }
      >
        <HomeRecentWork />
      </Suspense>
    </main>
  );
}
