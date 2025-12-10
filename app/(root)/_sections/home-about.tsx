import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

import { fontDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const HomeAbout = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-8 pt-30 w-4/5 mx-auto">
        <ImagePlaceholder aspectRatio={3 / 4} className="rounded-md" />
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
            variant={"shadow"}
            size={"lg"}
            className="my-10 h-12 text-lg "
          >
            Button
          </Button>
        </div>
      </div>
    </section>
  );
};
