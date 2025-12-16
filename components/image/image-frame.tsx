import { cn } from "@/lib/utils";

export function ImageFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-2 bg-white p-2 shadow-sm transition-colors duration-300 group-hover:border-gold",
        className
      )}
    >
      <div className="relative overflow-hidden border border-stone-200">
        {children}
      </div>
    </div>
  );
}
