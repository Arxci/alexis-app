import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageCardSkeleton } from "./image-card-skeleton";

import { cn } from "@/lib/utils";

type ImageShowcaseSkeletonProps = {
  label: string;
  ratio: number;
  count?: number;
  link?: string;
  mobileCols?: 2 | 3;
};

export function ImageShowcaseSkeleton({
  label,
  ratio,
  count = 9,
  link,
  mobileCols = 3,
}: ImageShowcaseSkeletonProps) {
  const mobileGridClass = mobileCols === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="mx-auto">
      <Card className="p-2 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-stone-900 pb-6 mb-10 gap-6">
          <h2 className="text-[11vw] sm:text-5xl md:text-6xl font-black tracking-tighter text-brand-outline pt-4 text-center font-display">
            {label}
          </h2>
          {link && (
            <Button asChild size="lg" variant="outline">
              <Link href={link}>View More</Link>
            </Button>
          )}
        </div>

        <div
          className={cn("grid gap-1 md:grid-cols-3 md:gap-6", mobileGridClass)}
        >
          {Array.from({ length: count }).map((_, i) => (
            <ImageCardSkeleton key={i} ratio={ratio} />
          ))}
        </div>
      </Card>
    </div>
  );
}
