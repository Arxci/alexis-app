import { Image, Link } from "lucide-react";

import { cn } from "@/lib/utils";

export interface IconProps {
  className?: string;
}

export const Icons = {
  link: (props: IconProps) => (
    <Link {...props} className={cn("w-4 h-4", props.className)} />
  ),
  placeholder: (props: IconProps) => (
    <Image {...props} className={cn("w-4 h-4", props.className)} />
  ),
};
