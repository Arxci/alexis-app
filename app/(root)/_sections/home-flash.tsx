import { getFlash } from "@/lib/sanity/sanity-api";
import { HomeShowcase } from "../_components/home-showcase";

import { ImageCard } from "@/components/ui/image-card";

export const HomeFlash = async () => {
  const data = await getFlash();

  return (
    <section className="container">
      <HomeShowcase
        label="Flash"
        link="/flash"
        style={{
          container: "pt-0",
        }}
      >
        {data &&
          data.map((image, _id: number) => (
            <ImageCard
              key={_id}
              src={image.imageUrl}
              alt={image?.alt}
              ratio={16 / 9}
            />
          ))}
      </HomeShowcase>
    </section>
  );
};
