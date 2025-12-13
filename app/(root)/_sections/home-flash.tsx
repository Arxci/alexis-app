import { getFlashHome } from "@/lib/sanity/sanity-api";
import { ImageShowcase } from "../../../components/image/image-showcase";

import { ImageCard } from "@/components/image/image-card";

export const HomeFlash = async () => {
  const data = await getFlashHome();

  return (
    <section className="container">
      <ImageShowcase
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
      </ImageShowcase>
    </section>
  );
};
