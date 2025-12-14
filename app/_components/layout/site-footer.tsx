import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ComponentProps } from "react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-muted py-24 bg-background-light">
      <div className="container h-full flex px-4 gap-10 md:gap-16 flex-col lg:flex-row">
        <Link
          href="/"
          className="mr-auto font-medium text-2xl uppercase font-display"
        >
          {siteConfig.name}
        </Link>
        <div className="flex gap-8 lg:gap-14 flex-col lg:flex-row">
          <div>
            <FooterLabel label="Site" />
            <nav>
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
            <nav>
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
                    target="_blank"
                    href={siteConfig.links.email}
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
            </nav>
          </div>
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
