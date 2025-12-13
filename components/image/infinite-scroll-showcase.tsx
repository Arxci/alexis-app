"use client";

import { useEffect, useMemo } from "react";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";
import { ImageItem, PagedResult } from "@/lib/sanity/sanity-api";

type InfiniteScrollShowcaseProps = {
  label: string;
  initialData: ImageItem[];
  fetchData: (start: number, end: number) => Promise<PagedResult>;
  totalCount: number;
  imageRatio: number;
};

const ITEMS_PER_PAGE = 2;

export function InfiniteScrollShowcase({
  label,
  initialData,
  fetchData,
  totalCount,
  imageRatio,
}: InfiniteScrollShowcaseProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [label, "infinite-scroll"],
      queryFn: async ({ pageParam }) => {
        const start = pageParam as number;
        const end = start + ITEMS_PER_PAGE;
        return await fetchData(start, end);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return undefined;

        const loadedItemsCount = allPages.flatMap((page) => page.items).length;

        if (loadedItemsCount >= totalCount) {
          return undefined;
        }

        return loadedItemsCount;
      },
      initialData: {
        pages: [
          {
            items: initialData,
            totalCount: totalCount,
          },
        ],
        pageParams: [0],
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allImages = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  return (
    <ImageShowcase
      label={label}
      style={{
        link: "hidden",
      }}
    >
      {allImages.map((image) => (
        <ImageCard
          key={image._key}
          src={image?.imageUrl}
          alt={image?.alt}
          ratio={imageRatio}
        />
      ))}

      {hasNextPage && (
        <div
          ref={ref}
          className="col-span-1 md:col-span-3 h-24 w-full flex justify-center items-center"
        >
          {isFetchingNextPage ? (
            <span className="opacity-50 text-sm animate-pulse">Loading...</span>
          ) : (
            <span className="h-full w-full" />
          )}
        </div>
      )}
    </ImageShowcase>
  );
}
