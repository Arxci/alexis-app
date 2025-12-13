import { getFlash } from "@/lib/sanity/sanity-api";
import { HomeShowcase } from "../_components/home-showcase";

import { ImageCard } from "@/components/ui/image-card";

export const HomeFlash = async () => {
  const data = await getFlash();

  console.log(data);

  return (
    <section className="container">
      <HomeShowcase
        label="Flash"
        link="/flash"
        style={{
          container: "pt-0",
        }}
      >
        <ImageCard src={"/flash-01.jpg"} alt="Thing" ratio={16 / 9} />
        <ImageCard src={"/flash-02.jpg"} alt="Thing" ratio={16 / 9} />
        <ImageCard src={"/flash-03.jpg"} alt="Thing" ratio={16 / 9} />
      </HomeShowcase>
    </section>
  );
};
