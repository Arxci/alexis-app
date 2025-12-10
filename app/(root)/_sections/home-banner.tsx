import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { cn } from "@/lib/utils";
import { fontDisplay } from "@/lib/fonts";

export const HomeBanner = () => {
  return (
    <section className="container px-0">
      <div className="hidden lg:flex relative">
        <AspectRatio ratio={16 / 7} className="overflow-hidden">
          <Image
            src={"/home-banner.png"}
            alt="Banner image"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover "
          />
        </AspectRatio>
        <div
          className={cn(
            fontDisplay.className,
            "absolute z-10 [text-shadow:0_4px_8px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.5)] text-white text-6xl font-bold  mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
        >
          AceArts
        </div>
      </div>
      <div className="hidden md:flex lg:hidden">
        <AspectRatio ratio={4 / 3} className="overflow-hidden bg-red-500">
          <Image
            src={"/home-banner.png"}
            alt="Banner image"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex md:hidden">
        <AspectRatio ratio={3 / 4} className="overflow-hidden bg-red-500">
          <Image
            src={"/home-banner.png"}
            alt="Banner image"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </AspectRatio>
      </div>

      {/*<ImagePlaceholder aspectRatio={16 / 7} />*/}
    </section>
  );
};
