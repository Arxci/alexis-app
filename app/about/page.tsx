import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="">
      <section className="container lg:px-0">
        <Card className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
              <span className="w-fit mb-6 inline-block text-xs font-bold uppercase tracking-widest bg-gold text-ink px-2 py-1 border-2 shadow-[4px_4px_0px_0px_var(--color-foreground)]">
                Learn about me
              </span>

              <h1 className="text-[4vw] text-xs lg:text-lg font-black leading-normal text-foreground mb-6">
                My name is Alexis Nesteby, but you can call me Lexi. I am a
                tattoo artist, music fanatic, and super nerd based out of Cedar
                Rapids, Iowa.
                <br />
                My work reflects my love of pop culture, metal music, all things
                WEIRD, and traditional tattooing history.
                <br />I love bold, colorful traditional work, and enjoy creating
                eye catching designs that you can spot from a mile away. Whether
                you&apos;re bringing in your own idea or picking a flash design
                from my collection, I am ready to work together to create some
                amazing art! You&apos;ll find me at Neon Dragon Tattoo and Art
                collective, in my home state of Iowa.
              </h1>

              <div className="flex flex-col sm:flex-row  ">
                <Button asChild variant={"outline"} size="lg">
                  <Link href={"#"}>Connect @ace_arts30</Link>
                </Button>
              </div>
            </div>
            <div className={"relative order-1 lg:order-2 row-start-1"}>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={"/about-me.jpg"}
                  alt={"Photo of author"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </AspectRatio>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
