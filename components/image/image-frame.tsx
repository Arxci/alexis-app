import { cn } from "@/lib/utils";

export const ImageFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2 group", className)}>
      <div className="border-2  bg-white p-2 shadow-sm transition-colors duration-300 group-hover:border-gold">
        <div className="relative overflow-hidden border border-stone-200">
          {children}
        </div>
      </div>
    </div>
  );
};
