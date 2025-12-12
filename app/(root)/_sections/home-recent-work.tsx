import { HomeShowcase } from "../_components/home-showcase";
import { ImageCard } from "@/components/ui/image-card";

export const HomeRecentWork = () => {
  return (
    <section className="container">
      <HomeShowcase label="Recent Work" link="/recent">
        <ImageCard src={"/recent-01.jpeg"} alt="Thing" ratio={3 / 4} />
        <ImageCard src={"/recent-02.jpeg"} alt="Thing" ratio={3 / 4} />
        <ImageCard src={"/recent-03.jpeg"} alt="Thing" ratio={3 / 4} />
      </HomeShowcase>
    </section>
  );
};
