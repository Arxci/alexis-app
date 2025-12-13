"use client";

import { useState, useEffect, useCallback } from "react";

import { useInView } from "react-intersection-observer";

import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";

import { ImageItem, PagedResult } from "@/lib/sanity/sanity-api";

type InfiniteScrollShowcaseProps = {
  label: string;
  initialData: ImageItem[];
  fetchData: (start: number, end: number) => Promise<PagedResult>;
  totalCount: number;
};

export function InfiniteScrollShowcase({
  label,
  initialData,
  fetchData,
  totalCount,
}: InfiniteScrollShowcaseProps) {
  const [data, setData] = useState<ImageItem[]>(initialData);
  const [hasMore, setHasMore] = useState(initialData.length < totalCount);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const start = data.length;
    const end = start + 8;

    try {
      const result = await fetchData(start, end);
      const newImages = result.items;

      if (!newImages || newImages.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newImages]);

        if (newImages.length < 9) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [data.length, hasMore, isLoading, fetchData]);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoading, loadMore]);

  return (
    <ImageShowcase
      label={label}
      style={{
        link: "hidden",
      }}
    >
      {data.map((image) => (
        <ImageCard
          key={image._key}
          src={image?.imageUrl}
          alt={image?.alt}
          ratio={16 / 9}
        />
      ))}

      {hasMore && (
        <div
          ref={ref}
          className="col-span-1 md:col-span-3 h-24 w-full flex justify-center items-center"
        >
          {isLoading ? (
            <span className="opacity-50 text-sm animate-pulse">Loading...</span>
          ) : (
            <span className="h-full w-full" />
          )}
        </div>
      )}
    </ImageShowcase>
  );
}
