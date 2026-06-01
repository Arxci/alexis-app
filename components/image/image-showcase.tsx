// components/image/image-showcase.tsx
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";

import { cn } from "@/lib/utils";

type ImageShowcaseProps = {
  label: string;
  children?: React.ReactNode;
  className?: string;
  mobileCols?: 2 | 3;
} & ({ link: string; showLink?: true } | { link?: never; showLink: false });

export function ImageShowcase({
  label,
  link,
  showLink = true,
  children,
  className,
  mobileCols = 3,
}: ImageShowcaseProps) {
  const mobileGridClass = mobileCols === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={cn("mx-auto", className)}>
      <Card className="p-2 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-stone-900 pb-6 mb-10 gap-6">
          <h1 className="text-[11vw] sm:text-5xl md:text-6xl font-black tracking-tighter text-brand-outline pt-4 text-center font-display">
            {label}
          </h1>
          {showLink && link && (
            <Button asChild size="lg" variant="outline">
              <Link href={link}>View More</Link>
            </Button>
          )}
        </div>

        <div
          className={cn("grid gap-1 md:grid-cols-3 md:gap-6", mobileGridClass)}
        >
          {children}
        </div>
      </Card>
    </div>
  );
}
