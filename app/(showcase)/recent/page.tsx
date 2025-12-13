import { InfiniteScrollShowcase } from "@/components/image/infinite-scroll-showcase";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { fetchMoreRecentWork } from "./actions";

export const revalidate = 60;

export default async function RecentWorkPage() {
  const { items, totalCount } = await getRecentWork(0, 9);

  return (
    <main>
      <section className="container lg:px-0">
        <InfiniteScrollShowcase
          label="Recent Work"
          initialData={items}
          fetchData={fetchMoreRecentWork}
          totalCount={totalCount}
          imageRatio={3 / 4}
        />
      </section>
    </main>
  );
}
