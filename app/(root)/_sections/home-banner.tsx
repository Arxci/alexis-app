import { siteConfig } from "@/config/site";
import { SplitLayout } from "../_components/split-layout";

import imageBanner from "@/public/home-banner.jpeg";
import imageBannerWide from "@/public/home-banner-wide.jpeg";

export const HomeBanner = () => {
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
        imageSrc={imageBanner}
        placeholder="blur"
        imageAlt="Interior of Neon Dragon Tattoo studio in Cedar Rapids, featuring traditional tattoo artwork and bold designs by Ace Arts"
        priority={true}
        aspectRatio={3 / 4}
        linkTarget="_blank"
        responsiveImages={[
          {
            src: imageBanner,
            aspectRatio: 3 / 4,
          },
          {
            src: imageBannerWide,
            aspectRatio: 16 / 9,
          },
        ]}
      />
    </section>
  );
};
