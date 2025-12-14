import { client } from "./sanity-client";
import {
  flashCountQuery,
  flashQuery,
  recentWorkQuery,
  recentWorkCountQuery,
} from "./sanity-queries";
import { errorLogger, ErrorType } from "@/lib/error-handling";

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
  countQuery: string,
  fetchCount = true,
  start?: number,
  end?: number
): Promise<PagedResult> {
  const safeStart = start ?? 0;
  const safeEnd = end ?? 10000;

  try {
    if (fetchCount) {
      const [items, totalCount] = await Promise.all([
        client.fetch<ImageItem[]>(
          dataQuery,
          { start: safeStart, end: safeEnd },
          { next: { revalidate: 3600 } }
        ),
        client.fetch<number>(countQuery, {}, { next: { revalidate: 3600 } }),
      ]);
      return { items, totalCount };
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
  return fetchPagedData(
    recentWorkQuery,
    recentWorkCountQuery,
    fetchCount,
    start,
    end
  );
}

export async function getFlash(
  start: number,
  end: number,
  fetchCount = true
): Promise<PagedResult> {
  return fetchPagedData(flashQuery, flashCountQuery, fetchCount, start, end);
}
