import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main>
      <section className="container py-24 lg:px-0">
        <Card>
          <div className="flex flex-col items-center text-center justify-center p-4 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
            <span className="w-fit mb-6 inline-block text-xs font-bold uppercase tracking-widest bg-gold text-ink px-2 py-1 border-2 shadow-[4px_4px_0px_0px_var(--color-foreground)]">
              Oops!
            </span>
            <h1 className="font-display text-[10vw] sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase leading-[0.9] text-foreground mb-6">
              Wrong Turn
            </h1>
            <p className="text-lg md:text-xl text-stone-800 mb-10 max-w-md leading-relaxed">
              This page is as empty as a fresh canvas. Click below to get back
              to the art.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
