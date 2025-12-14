"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-normal transition-colors cursor-pointer subpixel-antialiased transform-gpu data-[pressed=true]:scale-[0.97] motion-reduce:transition-none select-none appearance-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden tracking-widest backface-hidden",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground hover:bg-accent/90 ",
        outline:
          "border-2 border-accent bg-transparent text-accent shadow-[4px_4px_0px_0px_var(--color-accent)] hover:bg-accent hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent",
        link: "text-accent underline-offset-4 hover:underline underline-accent",
      },
      size: {
        default: "h-12 px-6 py-2 has-[>svg]:px-3 text-md",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-2.5 text-sm",
        lg: "h-14 px-8 has-[>svg]:px-4 text-sm xs:text-md sm:text-base md:text-lg",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
