import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";
import { ImageFrame } from "./image-frame";

export const ImageCardSkeleton = ({ ratio }: { ratio: number }) => {
  return (
    <ImageFrame>
      <AspectRatio ratio={ratio} className="overflow-hidden">
        <Skeleton
          className="h-full w-full bg-stone-300 animate-pulse"
          style={{ animationDuration: "2s" }}
        />
      </AspectRatio>
    </ImageFrame>
  );
};
