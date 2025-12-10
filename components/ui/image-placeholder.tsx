import { Icons } from "../icons";
import { AspectRatio } from "./aspect-ratio";

import { cn } from "@/lib/utils";

export const ImagePlaceholder = ({
  aspectRatio = 0,
  className,
}: {
  aspectRatio?: number;
  className?: string;
}) => {
  return (
    <AspectRatio
      ratio={aspectRatio}
      className={cn(
        "flex items-center justify-center bg-stone-800 border border-gray-600 w-full shadow-lg shadow-stone-300",
        className
      )}
    >
      <Icons.placeholder className="text-stone-700 h-18 w-18" />
    </AspectRatio>
  );
};
