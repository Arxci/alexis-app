import { ImagePlaceholder } from "@/components/ui/image-placeholder";

import { HomeShowcase } from "../_components/home-showcase";

export const HomeGallery = () => {
  return (
    <section className="container">
      <HomeShowcase label="Flash" link="/flash">
        <ImagePlaceholder aspectRatio={16 / 9} />
        <ImagePlaceholder aspectRatio={16 / 9} />
        <ImagePlaceholder aspectRatio={16 / 9} />
      </HomeShowcase>
    </section>
  );
};
