"use client";

import { FocusEvent, PointerEvent, useCallback, useState } from "react";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { easeOut, motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rippleVariants = cva("absolute h-8 w-8 rounded-full opacity-100 ", {
  variants: {
    variant: {
      default: "bg-white/60",
      destructive: "bg-foreground/60",
      outline: "bg-foreground/60",
      secondary: "bg-secondary-foreground/60",
      ghost: "bg-foreground/60",
      link: "bg-foreground/60",
    },
  },
});

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer subpixel-antialiased transform-gpu data-[pressed=true]:scale-[0.97] motion-reduce:transition-none select-none appearance-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [rippleCoords, setRippleCoords] = useState<{
    x: number;
    y: number;
    id: number;
  } | null>(null);

  const Comp = asChild ? Slot : "button";

  const triggerRipple = useCallback((x: number, y: number) => {
    setRippleCoords({ x, y, id: Date.now() });
  }, []);

  const handlePointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
    setIsHovered(true);

    props.onPointerEnter?.(e);
  };

  const handlePointerLeave = (e: PointerEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setIsPressed(false);

    props.onPointerLeave?.(e);
  };

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (props.disabled || e.button !== 0) return;
    setIsPressed(true);
    props.onPointerDown?.(e);
  };

  const handlePointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (props.disabled || e.button !== 0) return;
    setIsPressed(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 15; // -15 to center the 30px ripple
    const y = e.clientY - rect.top - 15;

    triggerRipple(x, y);

    props.onPointerUp?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (props.disabled) return;
    if (e.key === " ") e.preventDefault();

    if (e.key === "Enter" || e.key === " ") {
      setIsPressed(true);
    }
    props.onKeyDown?.(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (props.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      setIsPressed(false);
      const rect = e.currentTarget.getBoundingClientRect();
      triggerRipple(rect.width / 2 - 15, rect.height / 2 - 15);
    }

    props.onKeyUp?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);

    props.onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);

    props.onBlur?.(e);
  };

  const handleRippleComplete = () => {
    setRippleCoords(null);
  };

  return (
    <Comp
      data-slot="button"
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerUp={handlePointerUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      data-pressed={isPressed}
      data-focused={isFocused}
      data-hovered={isHovered}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Slottable>{children}</Slottable>

      {rippleCoords && (
        <motion.span
          key={rippleCoords.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          onAnimationComplete={handleRippleComplete}
          className={cn(rippleVariants({ variant }))}
          style={{ left: rippleCoords.x, top: rippleCoords.y }}
        />
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
