import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { HomeShowcase } from "../_components/home-showcase";
import { ImageFrame } from "@/components/ui/image-frame";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export const HomeGallery = () => {
  return (
    <section className="container">
      <HomeShowcase label="Flash" link="/flash" style={{ container: "pt-0" }}>
        <ImageFrame caption="Label">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <Image
              src={"/flash-01.jpg"}
              alt="Thing"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </AspectRatio>
        </ImageFrame>
        <ImageFrame caption="Label">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <Image
              src={"/flash-02.jpg"}
              alt="Thing"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </AspectRatio>
        </ImageFrame>
        <ImageFrame caption="Label">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <Image
              src={"/flash-03.jpg"}
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
