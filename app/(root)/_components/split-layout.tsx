import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "../../../components/ui/card";

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
  style?: { image?: string; card?: string; heading?: string };
  aspectRatio: number;
}) => {
  return (
    <Card className={cn("p-0", style?.card)}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
          <span className="w-fit mb-6 inline-block font-mono text-xs font-bold uppercase tracking-widest bg-gold text-ink px-2 py-1 border-2 shadow-[4px_4px_0px_0px_var(--color-foreground)]">
            {eyebrow}
          </span>

          <h1
            className={cn(
              "font-display text-[10vw] sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase leading-[0.9] text-foreground mb-6",
              style?.heading
            )}
          >
            {heading}
          </h1>

          <p className="text-lg md:text-xl text-stone-800 mb-10 max-w-md leading-relaxed">
            {subheading}
          </p>

          <div className="flex flex-col sm:flex-row  ">
            <Button asChild variant={"outline"} size="lg">
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
              loading="eager"
              priority
              className={cn("object-cover", style?.image)}
              sizes="(max-width: 1024px) 95vw, 50vw"
            />
          </AspectRatio>
        </div>
      </div>
    </Card>
  );
};
