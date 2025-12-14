import { SplitLayout } from "../_components/split-layout";

export const HomeAbout = () => {
  return (
    <section className="container py-24 lg:px-0">
      <SplitLayout
        eyebrow="Hi, I am Alexis Nesteby"
        heading="A Visual Artist & Tattooer"
        subheading="Based in Cedar Rapids, Iowa."
        buttonLabel="About Alexis"
        buttonLink="/about"
        imageSrc="/about-me.jpg"
        imageAlt="Alexis Nesteby, tattoo artist at Neon Dragon Tattoo in Cedar Rapids, Iowa"
        flip={true}
        style={{ image: "object-center" }}
        aspectRatio={3 / 4}
      />
    </section>
  );
};
