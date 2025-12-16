// app/(root)/_sections/home-banner.tsx
import { siteConfig } from "@/config/site";
import { SplitLayout } from "../_components/split-layout";

import imageBanner from "@/public/home-banner.jpeg";
import imageBannerWide from "@/public/home-banner-wide.jpeg";

export function HomeBanner() {
  return (
    <section className="container lg:px-0">
      <SplitLayout
        eyebrow="Est. 2025 • Cedar Rapids"
        heading={
          <>
            Ace Arts <br />
            <span className="text-brand-outline">Tattoos</span>
          </>
        }
        subheading="Your friendly neighborhood tattoo artist."
        buttonLabel="Visit Neon Dragon Tattoo"
        buttonLink={siteConfig.links.neonDrago}
        buttonExternal
        image={{
          desktop: { src: imageBanner, aspectRatio: 3 / 4 },
          mobile: { src: imageBannerWide, aspectRatio: 16 / 9 },
          alt: "Interior of Neon Dragon Tattoo studio in Cedar Rapids",
          priority: true,
          placeholder: "blur",
        }}
      />
    </section>
  );
}
