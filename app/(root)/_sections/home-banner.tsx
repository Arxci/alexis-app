import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SplitLayout } from "../_components/split-layout";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fontDisplay } from "@/lib/fonts";

export const HomeBanner = () => {
  return (
    <section className="container lg:px-0">
      <SplitLayout
        eyebrow="Est. 2025 • Cedar Rapids"
        heading={
          <>
            Ace Arts <br />
            <span className="text-emerald-700 [-webkit-text-stroke:2px_var(--color-emerald-900)]">
              Tattoos
            </span>
          </>
        }
        subheading="Your friendly neighborhood tattoo artist."
        buttonLabel="Neon Dragon"
        buttonLink="#"
        imageSrc="/home-banner.png"
        imageAlt="Ace Art Studio Interior"
        style={{
          image: "object-right md:object-center lg:object-right",
          card: "hidden lg:flex",
        }}
        aspectRatio={3 / 4}
      />
      <SplitLayout
        eyebrow="Est. 2025 • Cedar Rapids"
        heading={
          <>
            Ace Arts <br />
            <span className="text-emerald-700 [-webkit-text-stroke:2px_var(--color-emerald-900)]">
              Tattoos
            </span>
          </>
        }
        subheading="Your friendly neighborhood tattoo artist."
        buttonLabel="Neon Dragon"
        buttonLink="#"
        imageSrc="/home-banner.png"
        imageAlt="Ace Art Studio Interior"
        style={{
          image: "lg:object-left",
          card: "block lg:hidden",
        }}
        aspectRatio={16 / 9}
      />
    </section>

    // <section className="container px-0">
    //   <div className="hidden lg:flex relative">
    //     <AspectRatio ratio={16 / 7} className="overflow-hidden">
    //       <Image
    //         src={"/home-banner.png"}
    //         alt="Banner image"
    //         fill
    //         loading="eager"
    //         sizes="(max-width: 1024px) 100vw, 1024px"
    //         className="object-cover "
    //       />
    //     </AspectRatio>
    //     <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
    //       <h2
    //         className={cn(
    //           fontDisplay.className,
    //           "[text-shadow:0_4px_8px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.5)] text-shadow-lg text-shadow-black w-full text-center text-white text-6xl font-bold "
    //         )}
    //       >
    //         Ace Art Tattoos
    //       </h2>
    //     </div>
    //   </div>
    //   <div className="hidden md:flex lg:hidden">
    //     <AspectRatio ratio={4 / 3} className="overflow-hidden bg-red-500">
    //       <Image
    //         src={"/home-banner.png"}
    //         alt="Banner image"
    //         fill
    //         loading="eager"
    //         sizes="(max-width: 1024px) 100vw, 1024px"
    //         className="object-cover"
    //       />
    //     </AspectRatio>
    //   </div>
    //   <div className="flex md:hidden">
    //     <AspectRatio ratio={3 / 4} className="overflow-hidden bg-red-500">
    //       <Image
    //         src={"/home-banner.png"}
    //         alt="Banner image"
    //         fill
    //         loading="eager"
    //         sizes="(max-width: 1024px) 100vw, 1024px"
    //         className="object-cover"
    //       />
    //     </AspectRatio>
    //   </div>

    //   {/*<ImagePlaceholder aspectRatio={16 / 7} />*/}
    // </section>
  );
};
