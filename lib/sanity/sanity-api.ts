import { client } from "./sanity-client";
import {
  flashCountQuery,
  flashQuery,
  recentWorkQuery,
  recentWorkCountQuery,
} from "./sanity-queries";

export type ImageItem = {
  _key: string;
  alt: string;
  imageUrl: string;
};

export type PagedResult = {
  items: ImageItem[];
  totalCount: number;
};

async function fetchPagedData(
  dataQuery: string,
  countQuery: string,
  start?: number,
  end?: number
): Promise<PagedResult> {
  const safeStart = start ?? 0;
  const safeEnd = end ?? 10000;

  const [items, totalCount] = await Promise.all([
    client.fetch(dataQuery, { start: safeStart, end: safeEnd }),
    client.fetch(countQuery),
  ]);

  return { items, totalCount };
}

export async function getRecentWork(
  start: number,
  end: number
): Promise<PagedResult> {
  return fetchPagedData(recentWorkQuery, recentWorkCountQuery, start, end);
}

export async function getFlash(
  start: number,
  end: number
): Promise<PagedResult> {
  return fetchPagedData(flashQuery, flashCountQuery, start, end);
}
