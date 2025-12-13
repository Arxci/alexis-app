import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";
import { getFlashPaged } from "@/lib/sanity/sanity-api";

export default async function GalleryPage() {
  const data = await getFlashPaged(0, 8);

  return (
    <main className="">
      <section className="container lg:px-0">
        <ImageShowcase
          label="Flash"
          style={{
            link: "hidden",
          }}
        >
          {" "}
          {data &&
            data.map((image, _id: number) => (
              <ImageCard
                key={_id}
                src={image?.imageUrl}
                alt={image?.alt}
                ratio={16 / 9}
              />
            ))}
        </ImageShowcase>
      </section>
    </main>
  );
}
