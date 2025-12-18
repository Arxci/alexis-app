// app/(root)/_components/split-layout.tsx
import { getImageProps } from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";

import { cn } from "@/lib/utils";

type ImageConfig = {
  src: string | StaticImport;
  aspectRatio: number;
};

type SplitLayoutProps = {
  eyebrow: React.ReactNode;
  heading: React.ReactNode;
  subheading: React.ReactNode;
  buttonLabel: string;
  buttonLink: string;
  buttonExternal?: boolean;
  image: {
    desktop: ImageConfig;
    mobile?: ImageConfig;
    alt: string;
    priority?: boolean;
    placeholder?: "blur" | "empty";
  };
  flip?: boolean;
  className?: {
    card?: string;
    heading?: string;
    image?: string;
  };
};

export function SplitLayout({
  eyebrow,
  heading,
  subheading,
  buttonLabel,
  buttonLink,
  buttonExternal = false,
  image,
  flip = false,
  className,
}: SplitLayoutProps) {
  const desktopImage = image.desktop;
  const mobileImage = image.mobile ?? image.desktop;

  const commonProps = {
    alt: image.alt,
    priority: image.priority,
    placeholder: image.placeholder,
    fill: true,
    className: cn("object-cover w-full h-full", className?.image),
  };

  // 1. Prepare Desktop Props (50vw width)
  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({
    ...commonProps,
    src: desktopImage.src,
    sizes: "(min-width: 1024px) 50vw, 100vw",
  });

  // 2. Prepare Mobile Props (100vw width)
  const {
    props: { srcSet: mobileSrcSet, src: mobileSrc, ...mobileProps },
  } = getImageProps({
    ...commonProps,
    src: mobileImage.src,
    sizes: "95vw",
  });

  return (
    <Card className={cn("p-0 overflow-hidden", className?.card)}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content Section */}
        <div className="flex flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
          <Eyebrow>{eyebrow}</Eyebrow>

          <h1
            className={cn(
              "font-display text-[10vw] sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase leading-[0.9] text-foreground mb-6",
              className?.heading
            )}
          >
            {heading}
          </h1>

          <p className="text-lg md:text-xl text-stone-800 mb-10 max-w-md leading-relaxed">
            {subheading}
          </p>

          <div className="flex flex-col sm:flex-row">
            <Button asChild variant="outline" size="lg">
              <Link
                href={buttonLink}
                target={buttonExternal ? "_blank" : undefined}
                rel={buttonExternal ? "noopener noreferrer" : undefined}
              >
                {buttonLabel}
              </Link>
            </Button>
          </div>
        </div>

        {/* Image Section - CSS Aspect Ratio Swap */}
        <div
          style={
            {
              "--mobile-ratio": mobileImage.aspectRatio,
              "--desktop-ratio": desktopImage.aspectRatio,
            } as React.CSSProperties
          }
          className={cn(
            "relative w-full overflow-hidden",
            "aspect-(--mobile-ratio) lg:aspect-(--desktop-ratio)",
            "order-1 lg:order-2",
            flip && "row-start-1"
          )}
        >
          <picture>
            {/* Desktop Source: Uses 50vw sizing */}
            <source
              media="(min-width: 1024px)"
              srcSet={desktopSrcSet}
              sizes={desktopProps.sizes}
            />
            {/* Mobile Source: Uses 100vw sizing */}
            <source srcSet={mobileSrcSet} sizes={mobileProps.sizes} />
            {/* Fallback Image */}
            <img
              {...mobileProps}
              src={mobileSrc}
              alt={image.alt}
              className={cn("object-cover w-full h-full", className?.image)}
              fetchPriority={image.priority ? "high" : "auto"}
              decoding={image.priority ? "sync" : "async"}
            />
          </picture>
        </div>
      </div>
    </Card>
  );
}
