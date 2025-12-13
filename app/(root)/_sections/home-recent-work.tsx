import { getRecentWorkHome } from "@/lib/sanity/sanity-api";
import { ImageShowcase } from "../../../components/image/image-showcase";
import { ImageCard } from "@/components/image/image-card";

export const HomeRecentWork = async () => {
  const data = await getRecentWorkHome();

  return (
    <section className="container">
      <ImageShowcase label="Recent Work" link="/recent">
        {data &&
          data.map((image, _id: number) => (
            <ImageCard
              key={_id}
              src={image.imageUrl}
              alt={image?.alt}
              ratio={3 / 4}
            />
          ))}
      </ImageShowcase>
    </section>
  );
};
