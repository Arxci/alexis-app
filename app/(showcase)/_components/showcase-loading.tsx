import { ImageLoading } from "@/components/image/image-loading";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

export default function ShowcaseLoading({
  label,
  ratio,
}: {
  label: string;
  ratio: number;
}) {
  return (
    <div className="mx-auto">
      <Card className="p-4 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-stone-900 pb-6 mb-10 gap-6">
          <h2
            className={cn(
              "text-[11vw] sm:text-5xl md:text-6xl font-black tracking-tighter text-brand-outline pt-4 text-center"
            )}
          >
            {label}
          </h2>
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"}>
          {Array.from({ length: 9 }).map((_, i) => (
            <ImageLoading key={i} ratio={ratio} />
          ))}
        </div>
      </Card>
    </div>
  );
}
