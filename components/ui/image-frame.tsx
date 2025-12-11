import { cn } from "@/lib/utils";

export const ImageFrame = ({
  children,
  className,
  caption,
}: {
  children: React.ReactNode;
  className?: string;
  caption?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2 group", className)}>
      <div className="border-2 border-stone-900 bg-white p-2 shadow-sm transition-transform duration-300 group-hover:-translate-y-2">
        <div className="relative overflow-hidden border border-stone-200">
          {children}
        </div>
      </div>
    </div>
  );
};
