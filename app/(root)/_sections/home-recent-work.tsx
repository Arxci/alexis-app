import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { fontDisplay } from "@/lib/fonts";

import { cn } from "@/lib/utils";

export const HomeRecentWork = () => {
  return (
    <section className="container">
      <div className="mx-auto pt-30">
        <h2
          className={cn(
            fontDisplay.className,
            "text-4xl font-semibold max-w-max mx-auto"
          )}
        >
          Recent Works
        </h2>
        <div className="grid grid-cols-3 gap-6 py-12">
          <ImagePlaceholder aspectRatio={3 / 4} className="rounded-md" />
          <ImagePlaceholder aspectRatio={3 / 4} className="rounded-md" />
          <ImagePlaceholder aspectRatio={3 / 4} className="rounded-md" />
        </div>
        <div className="flex justify-center">
          <Button size={"lg"} variant={"light"} className="h-12 text-lg px-6">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};
