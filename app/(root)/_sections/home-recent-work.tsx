import { getRecentWork } from "@/lib/sanity/sanity-api";
import { HomeShowcase } from "../_components/home-showcase";
import { ImageCard } from "@/components/ui/image-card";

export const HomeRecentWork = async () => {
  const data = await getRecentWork();

  return (
    <section className="container">
      <HomeShowcase label="Recent Work" link="/recent">
        {data &&
          data.map((image, _id: number) => (
            <ImageCard
              key={_id}
              src={image.imageUrl}
              alt={image?.alt}
              ratio={3 / 4}
            />
          ))}
      </HomeShowcase>
    </section>
  );
};
