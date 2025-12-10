import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

import { fontDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const HomeShowcase = ({
  label,
  link,
  children,
  style,
}: {
  label: string;
  link: string;
  children?: React.ReactNode;
  style?: {
    container?: string;
    header?: string;
    link?: string;
    content?: string;
  };
}) => {
  return (
    <div className={cn("mx-auto pt-30 ", style?.container)}>
      <h2
        className={cn(
          fontDisplay.className,
          "text-6xl font-semibold max-w-max mx-auto text-emerald-800",
          style?.header
        )}
      >
        {label}
      </h2>
      <div className={cn("grid grid-cols-3 gap-6 pt-12 pb-6", style?.content)}>
        {children}
      </div>
      <div className="flex justify-center">
        <Button
          asChild
          size={"lg"}
          variant={"light"}
          className={cn("h-13 text-2xl px-10", style?.link)}
        >
          <Link href={link}>View More</Link>
        </Button>
      </div>
    </div>
  );
};
