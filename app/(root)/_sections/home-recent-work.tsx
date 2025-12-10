import { ImagePlaceholder } from "@/components/ui/image-placeholder";

import { HomeShowcase } from "../_components/home-showcase";

export const HomeRecentWork = () => {
  return (
    <section className="container">
      <HomeShowcase
        label="Recent Work"
        link="/recent"
        style={{ container: "pb-20" }}
      >
        <ImagePlaceholder aspectRatio={3 / 4} />
        <ImagePlaceholder aspectRatio={3 / 4} />
        <ImagePlaceholder aspectRatio={3 / 4} />
      </HomeShowcase>
    </section>
  );
};
