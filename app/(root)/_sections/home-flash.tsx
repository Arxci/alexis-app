import { getFlash } from "@/lib/sanity/sanity-api";
import { ImageShowcase } from "../../../components/image/image-showcase";
import { ImageCard } from "@/components/image/image-card";

export const HomeFlash = async () => {
  const { items } = await getFlash(0, 3);

  return (
    <section className="container">
      <ImageShowcase
        label="Flash"
        link="/flash"
        style={{
          container: "pt-0",
        }}
      >
        {items &&
          items.map((image, _id: number) => (
            <ImageCard key={_id} ratio={16 / 9} {...image} />
          ))}
      </ImageShowcase>
    </section>
  );
};
