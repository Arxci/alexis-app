import { getRecentWork } from "@/lib/sanity/sanity-api";
import { ImageShowcase } from "../../../components/image/image-showcase";
import { ImageCard } from "@/components/image/image-card";

export const HomeRecentWork = async () => {
  const { items } = await getRecentWork(0, 3);

  return (
    <section className="container">
      <ImageShowcase label="Recent Work" link="/recent">
        {items &&
          items.map((image, _id: number) => (
            <ImageCard key={_id} ratio={3 / 4} {...image} />
          ))}
      </ImageShowcase>
    </section>
  );
};
