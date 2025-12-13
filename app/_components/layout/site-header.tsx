import Link from "next/link";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

import { siteConfig } from "@/config/site";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background-light backdrop-blur-lg lg:supports-backdrop-filter:bg-background-light/60">
      <div className="container h-18 grid grid-cols-[auto_1fr] items-center px-4">
        <Link
          href="/"
          className="mr-auto font-medium text-2xl uppercase font-display"
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
