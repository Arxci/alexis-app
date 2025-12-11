import { SplitLayout } from "../_components/split-layout";

export const HomeAbout = () => {
  return (
    <section className="container py-24 lg:px-0">
      <SplitLayout
        eyebrow="Hi, I am Alexis Nesteby"
        heading="A Visual Artist & Tattooer"
        subheading="Based in Cedar Rapids, Iowa."
        buttonLabel="Learn More"
        buttonLink="/about"
        imageSrc="/about-me.jpg"
        imageAlt="Photo of author"
        flip={true}
        style={{ image: "object-center" }}
        aspectRatio={3 / 4}
      />
      {/* <div className="py-50">
        <SectionCard className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))] gap-8 p-0 lg:w-4/5 mx-auto ">
          <AspectRatio ratio={3 / 4} className="overflow-hidden">
            <Image
              src={"/about-me.jpg"}
              alt="Photo of author"
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </AspectRatio>
          
          <div className="flex-1 flex flex-col gap-4 py-8 p-4">
            <div>
              <p className="pb-1 text-stone-500">Hi, I am Alexis Nesteby</p>
              <h2
                className={cn(fontDisplay.className, "text-4xl font-semibold")}
              >
                A Visual Artist & Tattooer
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Based in Cedar Rapids, Iowa.
            </p>
            <Button
              variant={"outline"}
              size={"lg"}
              className="h-12 text-lg mt-auto rounded-none"
              asChild
            >
              <Link href={"/about"}>Learn More</Link>
            </Button>
          </div>
        </SectionCard>
      </div> */}
    </section>
  );
};
