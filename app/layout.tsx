import type { Metadata } from "next";

import { SiteHeader } from "./_components/layout/site-header";
import { SiteFooter } from "./_components/layout/site-footer";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased", fontSans.variable)}>
        <div className="grid grid-rows-[auto_1fr_auto]">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
