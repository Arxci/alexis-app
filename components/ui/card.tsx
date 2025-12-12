import { cn } from "@/lib/utils";

export const Card = ({
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
        "border-2",
        // Hard 'Block' Shadow (Offset) - gives it depth without softness
        "shadow-[6px_6px_0px_0px_var(--foreground)]",
        "my-10",
        className
      )}
    >
      {children}
    </div>
  );
};
