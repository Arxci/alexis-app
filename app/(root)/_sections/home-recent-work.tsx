import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { HomeShowcase } from "../_components/home-showcase";
import { ImageFrame } from "@/components/ui/image-frame";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export const HomeRecentWork = () => {
  return (
    <section className="container">
      <HomeShowcase label="Recent Work" link="/recent">
        <ImageFrame caption="Label">
          <AspectRatio ratio={3 / 4} className="overflow-hidden">
            <Image
              src={"/recent-01.jpeg"}
              alt="Thing"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </AspectRatio>
        </ImageFrame>
        <ImageFrame caption="Label">
          <AspectRatio ratio={3 / 4} className="overflow-hidden">
            <Image
              src={"/recent-02.jpeg"}
              alt="Thing"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </AspectRatio>
        </ImageFrame>
        <ImageFrame caption="Label">
          <AspectRatio ratio={3 / 4} className="overflow-hidden">
            <Image
              src={"/recent-03.jpeg"}
              alt="Thing"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </AspectRatio>
        </ImageFrame>
      </HomeShowcase>
    </section>
  );
};
