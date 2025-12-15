"use client";

import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";
import { ImageLoading } from "./image-loading";

import { ImageItem, PagedResult } from "@/lib/sanity/sanity-api";
import { errorLogger, ErrorType } from "@/lib/error-handling";

type InfiniteScrollShowcaseProps = {
  label: string;
  initialData: ImageItem[];
  fetchData: (start: number, end: number) => Promise<PagedResult>;
  totalCount: number;
  imageRatio: number;
};

const ITEMS_PER_PAGE = 9;

export function InfiniteScrollShowcase({
  label,
  initialData,
  fetchData,
  totalCount,
  imageRatio,
}: InfiniteScrollShowcaseProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["images", label, "infinite-scroll"],
      queryFn: async ({ pageParam }) => {
        const start = pageParam as number;
        const end = start + ITEMS_PER_PAGE;

        // Server action handles errors internally and returns empty result
        // No need to try-catch here - errors are already logged server-side
        return await fetchData(start, end);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return undefined;
        const loadedItemsCount = allPages.flatMap((page) => page.items).length;
        if (loadedItemsCount >= totalCount) return undefined;
        return loadedItemsCount;
      },
      initialData: {
        pages: [{ items: initialData, totalCount: totalCount }],
        pageParams: [0],
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px",
  });

  const allImages = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ImageShowcase label={label} style={{ link: "hidden" }}>
      {allImages.map((image, id) => (
        <ImageCard
          key={"gallery-" + image._key}
          {...image}
          ratio={imageRatio}
          priority={id < 3}
        />
      ))}
      {isFetchingNextPage &&
        Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <ImageLoading key={`loading-${i}`} ratio={imageRatio} />
        ))}
      {hasNextPage && (
        <div
          ref={ref}
          className="col-span-full w-full h-4 invisible"
          aria-hidden="true"
        />
      )}
      <div aria-live="polite" className="sr-only">
        {allImages.length} images loaded of {totalCount}
      </div>
    </ImageShowcase>
  );
}
