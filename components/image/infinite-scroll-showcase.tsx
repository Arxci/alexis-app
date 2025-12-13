"use client";

import { useState, useEffect, useCallback } from "react";

import { useInView } from "react-intersection-observer";

import { ImageCard } from "@/components/image/image-card";
import { ImageShowcase } from "@/components/image/image-showcase";

type GalleryItem = {
  alt: string;
  imageUrl: string;
};

type InfiniteScrollShowcaseProps = {
  label: string;
  initialData: GalleryItem[];
  fetchData: (start: number, end: number) => Promise<GalleryItem[]>;
};

export function InfiniteScrollShowcase({
  label,
  initialData,
  fetchData,
}: InfiniteScrollShowcaseProps) {
  const [data, setData] = useState<GalleryItem[]>(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const start = data.length;
    const end = start + 8;

    try {
      const newImages = await fetchData(start, end);

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
      {data.map((image, idx) => (
        <ImageCard
          key={`${idx}-${image.alt}`}
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
