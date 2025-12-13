import type { Metadata } from "next";

import { SiteHeader } from "./_components/layout/site-header";
import { SiteFooter } from "./_components/layout/site-footer";

import { Providers } from "./_helpers/providers";

import { siteConfig } from "@/config/site";

import { fontVariables } from "@/lib/fonts";
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
    <html lang="en" className={fontVariables}>
      <body className={cn("group/body overscroll-none antialiased")}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
