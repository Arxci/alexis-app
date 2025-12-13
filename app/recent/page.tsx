import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { fetchMoreRecentWork } from "./actions";

export default async function RecentPage() {
  const { items, totalCount } = await getRecentWork(0, 9);

  return (
    <main>
      <section className="container lg:px-0">
        <InfiniteScrollShowcase
          label="Recent work"
          initialData={items}
          fetchData={fetchMoreRecentWork}
          totalCount={totalCount}
          imageRatio={3 / 4}
        />
      </section>
    </main>
  );
}
