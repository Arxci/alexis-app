import Link from "next/link";

import { Button } from "@/components/ui/button";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export const SiteHeader = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container h-16 grid grid-cols-[auto_1fr_auto] items-center ">
        <Link href="/" className="mr-auto font-medium text-xl">
          {siteConfig.name}
        </Link>
        <nav className="mx-auto">
          <ul className="flex gap-6">
            {siteConfig.siteMap.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  data-active={link.name === "Home"}
                  className="text-foreground/80 hover:text-primary data-[active=true]:font-semibold"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto">
          <Button
            className="rounded-sm"
            variant={"outline"}
            size={"icon"}
            aria-label="Socials"
            asChild
          >
            <Link href={"/"}>
              <Icons.link />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
