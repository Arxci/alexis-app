import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";
import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";
import { getFlashPaged } from "@/lib/sanity/sanity-api";
import { fetchMoreFlashImages } from "./actions";

export default async function GalleryPage() {
  const data = await getFlashPaged(0, 8);

  return (
    <main className="">
      <section className="container lg:px-0">
        <InfiniteScrollShowcase
          label="Flash"
          initialData={data}
          fetchData={fetchMoreFlashImages}
        />
      </section>
    </main>
  );
}
