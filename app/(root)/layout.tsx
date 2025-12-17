import { Analytics } from "@vercel/analytics/next";

import { SiteHeader } from "./_components/layout/site-header";
import { SiteFooter } from "./_components/layout/site-footer";
import { ScrollToTop } from "./_components/layout/scroll-to-top";
import { Providers } from "./_helpers/providers";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <Providers>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </Providers>
      <Analytics />
    </>
  );
}
