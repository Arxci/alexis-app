import { Suspense } from "react";

import Link from "next/link";

import { HomeAbout } from "./_sections/home-about";
import { HomeBanner } from "./_sections/home-banner";
import { HomeFlash } from "./_sections/home-flash";
import { HomeRecentWork } from "./_sections/home-recent-work";

import { Card } from "@/components/ui/card";
import { ImageLoading } from "@/components/image/image-loading";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

export default function IndexPage() {
  return (
    <main className="">
      <HomeBanner />
      <HomeAbout />
      <Suspense
        fallback={<SectionLoader ratio={16 / 9} label="Flash" link="/flash" />}
      >
        <HomeFlash />
      </Suspense>

      <Suspense
        fallback={
          <SectionLoader ratio={3 / 4} label="Recent Work" link="/recent" />
        }
      >
        <HomeRecentWork />
      </Suspense>
    </main>
  );
}

function SectionLoader({
  ratio,
  label,
  link,
}: {
  ratio: number;
  label: string;
  link: string;
}) {
  return (
    <section className="container">
      <div className="mx-auto">
        <Card className="p-4 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-stone-900 pb-6 mb-10 gap-6">
            <h2 className="text-[11vw] sm:text-5xl md:text-6xl font-black tracking-tighter text-brand-outline  pt-4 text-center font-display">
              {label}
            </h2>
            <Button asChild size={"lg"} variant={"outline"}>
              <Link href={link}>View More</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <ImageLoading ratio={ratio} />
            <ImageLoading ratio={ratio} />
            <ImageLoading ratio={ratio} />
          </div>
        </Card>
      </div>
    </section>
  );
}
