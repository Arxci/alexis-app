import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionCard } from "./section-card";

import { fontDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const SplitLayout = ({
  eyebrow,
  heading,
  subheading,
  buttonLabel,
  buttonLink,
  imageSrc,
  imageAlt,
  flip = false,
  style,
  aspectRatio,
}: {
  eyebrow?: string | React.ReactNode;
  heading?: string | React.ReactNode;
  subheading?: string | React.ReactNode;
  buttonLabel?: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  flip?: boolean;
  style?: { image?: string; card?: string };
  aspectRatio: number;
}) => {
  return (
    <SectionCard className={cn("p-0", style?.card)}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-4 sm:p-8 md:p-16 lg:p-20 order-2 lg:order-1">
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
            {eyebrow}
          </span>

          <h1
            className={cn(
              fontDisplay.className,
              "text-[11vw] sm:text-5xl md:text-6xl font-black uppercase leading-[0.9] text-foreground mb-6"
            )}
          >
            {heading}
          </h1>

          <p className="text-lg md:text-xl font-medium text-stone-800 mb-8 max-w-md leading-relaxed">
            {subheading}
          </p>

          <div className="flex flex-col sm:flex-row  ">
            <Button asChild variant="outline" size="lg">
              <Link href={buttonLink}>{buttonLabel}</Link>
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "relative order-1 lg:order-2 ",
            flip ? "row-start-1" : "row-start-0"
          )}
        >
          <AspectRatio ratio={aspectRatio}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className={cn("object-cover", style?.image)}
              sizes="(max-width: 1024px) 100vw"
            />
          </AspectRatio>
        </div>
      </div>
    </SectionCard>
  );
};
