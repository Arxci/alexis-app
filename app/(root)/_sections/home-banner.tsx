import { SplitLayout } from "../_components/split-layout";

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
        buttonLink="#" // TODO: Add Neon Dragon's website URL when available
        imageSrc="/home-banner.jpeg" // Fallback if responsiveImages not provided
        imageAlt="Interior of Neon Dragon Tattoo studio in Cedar Rapids, featuring traditional tattoo artwork and bold designs by Ace Arts"
        priority={true}
        aspectRatio={3 / 4}
        responsiveImages={[
          {
            src: "/home-banner.jpeg",
            aspectRatio: 3 / 4,
          },
          {
            src: "/home-banner-wide.jpeg",
            aspectRatio: 16 / 9,
          },
        ]}
      />
    </section>
  );
};
