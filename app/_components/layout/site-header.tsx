import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "./main-nav";

import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import { fontDisplay } from "@/lib/fonts";
import { MobileNav } from "./mobile-nax";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background-light backdrop-blur-lg supports-backdrop-filter:bg-background-light/60">
      <div className="container h-18 grid grid-cols-[auto_1fr] items-center px-4">
        <Link
          href="/"
          className={cn(fontDisplay.className, "mr-auto font-medium text-2xl")}
        >
          {siteConfig.name}
        </Link>
        <nav className="ml-auto hidden lg:flex">
          <MainNav />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
};
