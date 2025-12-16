// app/(root)/_components/split-layout.tsx
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    mobile?: ImageConfig; // Falls back to desktop if not provided
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

  return (
    <Card className={cn("p-0", className?.card)}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content */}
        <div className="flex flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
          <Eyebrow className="w-fit mb-6 inline-block font-mono text-xs font-bold uppercase tracking-widest bg-gold text-ink px-2 py-1 border-2 shadow-[4px_4px_0px_0px_var(--color-foreground)]">
            {eyebrow}
          </Eyebrow>

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

        {/* Image */}
        <div
          className={cn("relative order-1 lg:order-2", flip && "row-start-1")}
        >
          {/* Desktop */}
          <div className="hidden lg:block">
            <AspectRatio ratio={desktopImage.aspectRatio}>
              <Image
                src={desktopImage.src}
                alt={image.alt}
                fill
                priority={image.priority}
                placeholder={image.placeholder}
                className={cn("object-cover", className?.image)}
                sizes="(min-width: 1024px) 50vw, 0px"
              />
            </AspectRatio>
          </div>

          {/* Mobile */}
          <div className="block lg:hidden">
            <AspectRatio ratio={mobileImage.aspectRatio}>
              <Image
                src={mobileImage.src}
                alt={image.alt}
                fill
                priority={image.priority}
                placeholder={image.placeholder}
                className={cn("object-cover", className?.image)}
                sizes="(max-width: 1023px) 100vw, 0px"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </Card>
  );
}
