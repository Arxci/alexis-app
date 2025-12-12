"use client";

import { useCallback, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import useWindowDimensions, {
  WindowSize,
} from "../../../lib/hooks/useWindowDimensions";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useWindowDimensions(
    useCallback((size: WindowSize) => {
      setOpen(false);
    }, []),
    10
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent flex lg:hidden ml-auto rounded-none"
          )}
        >
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="relative w-8 h-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-8 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-8 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none bg-background-light  duration-100 data-[side=bottom]:slide-in-from-top-0!"
        align="end"
        side="bottom"
        sideOffset={18}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {siteConfig.siteMap.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <MobileLink
                    data-active={isActive}
                    key={index}
                    href={link.href}
                    onOpenChange={setOpen}
                  >
                    {link.name}
                  </MobileLink>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(
        "text-2xl font-medium data-[active=true]:text-accent uppercase",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
