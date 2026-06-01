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
        "border bg-white p-0.5 shadow-sm transition-colors duration-300 group-hover:border-gold sm:border-2 sm:p-2",
        className,
      )}
    >
      <div className="relative overflow-hidden border border-stone-200">
        {children}
      </div>
    </div>
  );
}
