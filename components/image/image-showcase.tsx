import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";

import { fontDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const ImageShowcase = ({
  label,
  link = "#",
  children,
  style,
}: {
  label: string;
  link?: string;
  children?: React.ReactNode;
  style?: {
    container?: string;
    header?: string;
    link?: string;
    content?: string;
  };
}) => {
  return (
    <div className={cn("mx-auto", style?.container)}>
      <Card className="p-4 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-stone-900 pb-6 mb-10 gap-6">
          <h2
            className={cn(
              fontDisplay.className,
              "text-[11vw] sm:text-5xl md:text-6xl font-black tracking-tighter [-webkit-text-stroke:2px_var(--color-emerald-900)] text-green pt-4 text-center",
              style?.header
            )}
          >
            {label}
          </h2>
          <Button
            asChild
            size={"lg"}
            variant={"outline"}
            className={cn(style?.link)}
          >
            <Link href={link} scroll={true}>
              View More
            </Link>
          </Button>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6",
            style?.content
          )}
        >
          {children}
        </div>
      </Card>
    </div>
  );
};
