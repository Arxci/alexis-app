import { Suspense } from "react";

import { ImageLoading } from "@/components/image/image.loading";
import { HomeAbout } from "./_sections/home-about";
import { HomeBanner } from "./_sections/home-banner";
import { HomeFlash } from "./_sections/home-flash";
import { HomeRecentWork } from "./_sections/home-recent-work";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="">
      <HomeBanner />
      <HomeAbout />
      <Suspense fallback={<SectionLoader ratio={16 / 9} />}>
        <HomeFlash />
      </Suspense>

      <Suspense fallback={<SectionLoader ratio={3 / 4} />}>
        <HomeRecentWork />
      </Suspense>
    </main>
  );
}

function SectionLoader({ ratio }: { ratio: number }) {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ImageLoading ratio={ratio} />
        <ImageLoading ratio={ratio} />
        <ImageLoading ratio={ratio} />
      </div>
    </section>
  );
}
