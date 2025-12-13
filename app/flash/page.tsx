import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";
import { getFlash } from "@/lib/sanity/sanity-api";
import { fetchMoreFlashImages } from "./actions";

export default async function GalleryPage() {
  const { items, totalCount } = await getFlash(0, 9);

  return (
    <main>
      <section className="container lg:px-0">
        <InfiniteScrollShowcase
          label="Flash"
          initialData={items}
          fetchData={fetchMoreFlashImages}
          totalCount={totalCount}
          imageRatio={16 / 9}
        />
      </section>
    </main>
  );
}
