import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

import { fontDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const HomeAbout = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))] gap-8 pt-30 lg:w-4/5 mx-auto">
        <AspectRatio ratio={3 / 4} className="overflow-hidden bg-red-500">
          <Image
            src={"/about-me.jpg"}
            alt="Photo of author"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </AspectRatio>
        {/*<ImagePlaceholder aspectRatio={3 / 4} />*/}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className={cn(fontDisplay.className, "text-4xl font-semibold")}>
            Lorem, ipsum dolor.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae fugit
            minus laborum a blanditiis deserunt quos facilis ab laudantium et
            officia error distinctio at, ipsum in atque beatae nihil! Dicta?
          </p>
          <Button
            variant={"outline"}
            size={"lg"}
            className="my-10 h-12 text-lg"
          >
            Button
          </Button>
        </div>
      </div>
    </section>
  );
};
