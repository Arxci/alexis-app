// app/(root)/_sections/home-about.tsx
import { SplitLayout } from "../_components/split-layout";
import image from "@/public/about-me.jpg";

export function HomeAbout() {
  return (
    <section className="container py-24 lg:px-0">
      <SplitLayout
        eyebrow="Hi, I am Alexis Nesteby"
        heading="A Visual Artist & Tattooer"
        subheading="Based in Cedar Rapids, Iowa."
        buttonLabel="About Alexis"
        buttonLink="/about"
        flip
        image={{
          desktop: { src: image },
          alt: "Alexis Nesteby, tattoo artist at Neon Dragon Tattoo",
          placeholder: "blur",
        }}
        className={{ image: "object-center" }}
      />
    </section>
  );
}
