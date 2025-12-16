import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageCardSkeleton } from "./image-card-skeleton";

type ImageShowcaseSkeletonProps = {
  label: string;
  ratio: number;
  count?: number;
  link?: string;
};

export function ImageShowcaseSkeleton({
  label,
  ratio,
  count = 9,
  link,
}: ImageShowcaseSkeletonProps) {
  return (
    <div className="mx-auto">
      <Card className="p-4 sm:p-8 md:p-10 lg:p-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <ImageCardSkeleton key={i} ratio={ratio} />
          ))}
        </div>
      </Card>
    </div>
  );
}
