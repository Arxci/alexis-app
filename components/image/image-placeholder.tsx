import { Icons } from "../icons";
import { AspectRatio } from "../ui/aspect-ratio";

import { cn } from "@/lib/utils";

export const ImagePlaceholder = ({
  ratio = 0,
  className,
}: {
  ratio?: number;
  className?: string;
}) => {
  return (
    <AspectRatio
      ratio={ratio}
      className={cn(
        "flex items-center justify-center bg-stone-800 border border-gray-600 w-full",
        className
      )}
    >
      <Icons.placeholder className="text-stone-700 h-18 w-18" />
    </AspectRatio>
  );
};
