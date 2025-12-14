import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ComponentProps } from "react";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-muted py-24 bg-background-light"
      role="contentinfo"
    >
      <div className="container px-4 flex flex-col gap-16">
        <div className="flex gap-10 md:gap-16 flex-col items-start lg:flex-row">
          <Link
            href="/"
            className="mr-auto   font-medium text-2xl uppercase font-display"
            aria-label="Return to home page"
          >
            {siteConfig.name}
          </Link>
          <div className="flex gap-8 lg:gap-14 flex-col lg:flex-row">
            <div>
              <FooterLabel label="Menu" />
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-2">
                  {siteConfig.siteMap.map((link, index) => (
                    <li key={index}>
                      <FooterLink href={link.href} label={link.name} />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <FooterLabel label="Socials" />

              <ul className="flex flex-col gap-2">
                <li>
                  <FooterLink
                    target="_blank"
                    href={siteConfig.links.instagram}
                    label="Instagram"
                  />
                </li>
                <li>
                  <FooterLink
                    href={`mailto:${siteConfig.links.email}`}
                    label="Email"
                  />
                </li>
                <li>
                  <FooterLink
                    target="_blank"
                    href={siteConfig.links.tiktok}
                    label="TikTok"
                  />
                </li>
              </ul>
            </div>
            <div>
              <FooterLabel label="Studio" />

              <ul className="flex flex-col gap-2">
                <li>
                  <FooterLink
                    target="_blank"
                    href={siteConfig.links.neonDrago}
                    label="Neon Dragon"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-muted pt-8 text-center gap-4 text-sm text-foreground/60">
          <p>
            &copy; 2025-{currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLabel = ({ label }: { label: string }) => {
  return <h2 className="mb-4 text-lg font-semibold uppercase">{label}</h2>;
};

const FooterLink = ({
  label,
  ...props
}: ComponentProps<typeof Link> & { label: string }) => {
  return (
    <Link
      {...props}
      className="hover:text-foreground text-foreground/80 transition-colors"
    >
      {label}
    </Link>
  );
};
