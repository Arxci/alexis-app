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
        "bg-background-light",
        "rounded-none",
        "border-2",
        "shadow-[6px_6px_0px_0px_var(--foreground)]",
        "my-10",
        className
      )}
    >
      {children}
    </div>
  );
};
