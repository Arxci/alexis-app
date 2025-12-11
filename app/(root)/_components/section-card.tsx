import { cn } from "@/lib/utils";

export const SectionCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // Paper Color
        "bg-background-light",
        // Sharp edges
        "rounded-none",
        // Thick 'Ink' border
        "border-2 border-stone-900",
        // Hard 'Block' Shadow (Offset) - gives it depth without softness
        "shadow-[6px_6px_0px_0px_rgba(28,25,23,1)]",
        "my-10",
        className
      )}
    >
      {children}
    </div>
  );
};
