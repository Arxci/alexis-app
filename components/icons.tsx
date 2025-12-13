import { Image, Link, XIcon, LoaderCircle } from "lucide-react";

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
  close: (props: IconProps) => (
    <XIcon {...props} className={cn("w-4 h-4", props.className)} />
  ),
  spinner: (props: IconProps) => (
    <LoaderCircle {...props} className={cn("w-4 h-4", props.className)} />
  ),
};
