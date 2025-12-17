"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-6">
      {siteConfig.siteMap.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.name} className="relative">
            <Link
              href={link.href}
              data-active={isActive}
              prefetch={true}
              className={cn(
                "text-foreground/80 text-md font-normal hover:text-primary relative transition-colors",
                "data-[active=true]:text-primary uppercase data-[active=true]:hover:text-foreground/80 "
              )}
            >
              {link.name}

              {isActive && (
                <span className="absolute w-full h-0.5 bg-accent left-0 bottom-0 rounded-md animate-in fade-in zoom-in-95 duration-200" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
