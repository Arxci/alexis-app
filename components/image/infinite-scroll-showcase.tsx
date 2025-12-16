"use client";

import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";
import { ImageCardSkeleton } from "./image-card-skeleton";

import { ImageItem, PagedResult } from "@/lib/sanity/sanity-api";

import { CACHE_CONFIG, INITIAL_FETCH_SIZE } from "@/config/cache";

type InfiniteScrollShowcaseProps = {
  label: string;
  initialData: ImageItem[];
  fetchData: (start: number, end: number) => Promise<PagedResult>;
  totalCount: number;
  imageRatio: number;
};

const LOADING_SKELETONS = Array.from({ length: INITIAL_FETCH_SIZE });

export function InfiniteScrollShowcase({
  label,
  initialData,
  fetchData,
  totalCount,
  imageRatio,
}: InfiniteScrollShowcaseProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["images", label, "infinite-scroll"],
      queryFn: async ({ pageParam }) => {
        const start = pageParam as number;
        const end = start + INITIAL_FETCH_SIZE;

        // Server action handles errors internally and returns empty result
        return await fetchData(start, end);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.reduce(
          (acc, page) => acc + page.items.length,
          0
        );
        return loadedCount < totalCount ? loadedCount : undefined;
      },
      initialData: {
        pages: [{ items: initialData, totalCount: totalCount }],
        pageParams: [0],
      },
      staleTime: CACHE_CONFIG.default,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px",
  });

  const allImages = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isError) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isError]);

  const isEmpty = allImages.length === 0 && !isFetchingNextPage && !isError;

  return (
    <ImageShowcase label={label} showLink={false}>
      <div role="status" aria-live="polite" className="sr-only">
        {isFetchingNextPage
          ? `Loading more ${label}...`
          : `${allImages.length} images loaded of ${totalCount}`}
      </div>
      {allImages.map((image, id) => (
        <ImageCard
          key={image._key}
          {...image}
          ratio={imageRatio}
          priority={id < 3}
        />
      ))}
      {isFetchingNextPage && (
        <>
          {LOADING_SKELETONS.map((_, i) => (
            <ImageCardSkeleton key={`loading-${i}`} ratio={imageRatio} />
          ))}
        </>
      )}
      {isEmpty && <ShowcaseEmpty label={label} />}
      {isError && <ShowcaseError />}
      {hasNextPage && (
        <div
          ref={ref}
          className="col-span-full h-4 w-full invisible"
          aria-hidden="true"
        />
      )}
    </ImageShowcase>
  );
}

const ShowcaseEmpty = ({ label }: { label: string }) => (
  <div className="col-span-full py-12 text-center">
    <p className="text-lg text-stone-600">
      No {label.toLowerCase()} available yet. Check back soon!
    </p>
  </div>
);

const ShowcaseError = () => (
  <div className="col-span-full pt-12 text-center text-stone-800">
    <p>Failed to load more images. Please refresh the page.</p>
  </div>
);
