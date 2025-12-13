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
        buttonLabel="Neon Dragon"
        buttonLink="#"
        imageSrc="/home-banner.jpeg"
        imageAlt="Ace Art Studio Interior"
        style={{
          image: "object-cover",
          card: "hidden lg:flex",
        }}
        aspectRatio={3 / 4}
      />
      <SplitLayout
        eyebrow="Est. 2025 • Cedar Rapids"
        heading={
          <>
            Ace Arts <br />
            <span className="text-brand-outline">Tattoos</span>
          </>
        }
        subheading="Your friendly neighborhood tattoo artist."
        buttonLabel="Neon Dragon"
        buttonLink="#"
        imageSrc="/home-banner-wide.jpeg"
        imageAlt="Ace Art Studio Interior"
        style={{
          card: "block lg:hidden",
        }}
        aspectRatio={16 / 9}
      />
    </section>
  );
};
