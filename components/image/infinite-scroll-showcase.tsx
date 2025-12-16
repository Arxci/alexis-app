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

const ITEMS_PER_PAGE = INITIAL_FETCH_SIZE;

export function InfiniteScrollShowcase({
  label,
  initialData,
  fetchData,
  totalCount,
  imageRatio,
}: InfiniteScrollShowcaseProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["images", label, "infinite-scroll"],
      queryFn: async ({ pageParam }) => {
        const start = pageParam as number;
        const end = start + ITEMS_PER_PAGE;

        // Server action handles errors internally and returns empty result
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
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ImageShowcase label={label} showLink={false}>
      {allImages.length === 0 && !isFetchingNextPage && (
        <ShowcaseEmpty label={label} />
      )}
      {allImages.map((image, id) => (
        <ImageCard
          key={image._key}
          {...image}
          ratio={imageRatio}
          priority={id < 3}
        />
      ))}
      {isFetchingNextPage && <ShowcaseLoading imageRatio={imageRatio} />}
      {hasNextPage && <InViewTrigger ref={ref} />}
      <div aria-live="polite" className="sr-only">
        {allImages.length} images loaded of {totalCount}
      </div>
    </ImageShowcase>
  );
}

const ShowcaseEmpty = ({ label }: { label: string }) => {
  return (
    <div className="col-span-full text-center py-12">
      <p className="text-lg text-stone-600">
        No {label.toLowerCase()} available yet. Check back soon!
      </p>
    </div>
  );
};

const ShowcaseLoading = ({ imageRatio }: { imageRatio: number }) => {
  return Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
    <ImageCardSkeleton key={`loading-${i}`} ratio={imageRatio} />
  ));
};

const InViewTrigger = ({
  ref,
}: {
  ref: (node?: Element | null | undefined) => void;
}) => {
  return (
    <div
      ref={ref}
      className="col-span-full w-full h-4 invisible"
      aria-hidden="true"
    />
  );
};
