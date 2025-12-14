import { client } from "./sanity-client";
import { flashQuery, recentWorkQuery } from "./sanity-queries";

import { errorLogger, ErrorType } from "@/lib/error-handling";

import { CACHE_CONFIG } from "@/config/cache";

export type ImageItem = {
  _key: string;
  alt: string;
  imageUrl: string;
  thumbUrl: string;
  mediumUrl: string;
  largeUrl: string;
  blurDataURL?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};

export type PagedResult = {
  items: ImageItem[];
  totalCount: number;
};

async function fetchPagedData(
  dataQuery: string,
  fetchCount = true,
  start?: number,
  end?: number
): Promise<PagedResult> {
  const safeStart = start ?? 0;
  const safeEnd = end ?? 10000;

  try {
    if (fetchCount) {
      const result = await client.fetch<{
        items: ImageItem[];
        totalCount: number;
      }>(
        dataQuery,
        { start: safeStart, end: safeEnd },
        { next: { revalidate: CACHE_CONFIG.default } }
      );
      return {
        items: result.items,
        totalCount: fetchCount ? result.totalCount : -1,
      };
    }

    const items = await client.fetch<ImageItem[]>(dataQuery, {
      start: safeStart,
      end: safeEnd,
    });

    return { items, totalCount: -1 };
  } catch (error) {
    console.error("Error fetching paged data from Sanity:", error);
    errorLogger.log({
      type: ErrorType.SANITY_FETCH,
      message: "Failed to fetch data from Sanity CMS",
      originalError: error,
      timestamp: new Date(),
      context: { query: dataQuery },
    });
    throw new Error("Failed to fetch images from Sanity CMS");
  }
}

export async function getRecentWork(
  start: number,
  end: number,
  fetchCount = true
): Promise<PagedResult> {
  return fetchPagedData(recentWorkQuery, fetchCount, start, end);
}

export async function getFlash(
  start: number,
  end: number,
  fetchCount = true
): Promise<PagedResult> {
  return fetchPagedData(flashQuery, fetchCount, start, end);
}
