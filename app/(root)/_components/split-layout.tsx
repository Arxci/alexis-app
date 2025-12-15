import Image from "next/image";
import Link from "next/link";

import {
  PlaceholderValue,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";

import { Button } from "@/components/ui/button";
import { Card } from "../../../components/ui/card";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { HTMLAttributeAnchorTarget } from "react";

type ImageSource = {
  src: string | StaticImport;
  aspectRatio: number;
};

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
  priority = false,
  responsiveImages,
  placeholder,
  linkTarget,
}: {
  eyebrow?: string | React.ReactNode;
  heading?: string | React.ReactNode;
  subheading?: string | React.ReactNode;
  buttonLabel?: string;
  buttonLink: string;
  imageSrc: string | StaticImport;
  imageAlt: string;
  flip?: boolean;
  style?: { image?: string; card?: string; heading?: string };
  aspectRatio: number;
  priority?: boolean;
  responsiveImages?: ImageSource[];
  placeholder?: PlaceholderValue | undefined;
  linkTarget?: HTMLAttributeAnchorTarget | undefined;
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
              <Link href={buttonLink} target={linkTarget}>
                {buttonLabel}
              </Link>
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "relative order-1 lg:order-2",
            flip ? "row-start-1" : "row-start-0"
          )}
        >
          {responsiveImages ? (
            <>
              <div className="hidden lg:block">
                <AspectRatio ratio={responsiveImages[0]?.aspectRatio}>
                  <Image
                    src={responsiveImages[0]?.src || ""}
                    placeholder={placeholder}
                    alt={imageAlt}
                    fill
                    fetchPriority={priority ? "high" : undefined}
                    priority={priority}
                    className={cn("object-cover", style?.image)}
                    sizes="(min-width: 1024px) 50vw, 0px"
                  />
                </AspectRatio>
              </div>

              <div className="block lg:hidden">
                <AspectRatio ratio={responsiveImages[1]?.aspectRatio}>
                  <Image
                    src={responsiveImages[1]?.src || ""}
                    placeholder={placeholder}
                    alt={imageAlt}
                    fill
                    priority={priority}
                    className={cn("object-cover", style?.image)}
                    sizes="(max-width: 1023px) 95vw, 0px"
                  />
                </AspectRatio>
              </div>
            </>
          ) : (
            <AspectRatio ratio={aspectRatio}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                placeholder={placeholder}
                fill
                loading={priority ? "eager" : "lazy"}
                priority={priority}
                className={cn("object-cover", style?.image)}
                sizes="(max-width: 1024px) 95vw, 50vw"
              />
            </AspectRatio>
          )}
        </div>
      </div>
    </Card>
  );
};
