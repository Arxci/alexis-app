import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export const ImageLoading = ({ ratio }: { ratio: number }) => {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="border-2 bg-white p-2 shadow-sm">
        <div className="relative overflow-hidden border border-stone-200">
          <AspectRatio ratio={ratio} className="overflow-hidden">
            <Skeleton
              className="h-full w-full bg-stone-300 animate-pulse"
              style={{ animationDuration: "2s" }}
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};
