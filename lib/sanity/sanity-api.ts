import { z } from "zod";

import { client } from "./sanity-client";
import { flashQuery, recentWorkQuery } from "./sanity-queries";

import { errorLogger, SanityFetchError } from "@/lib/error-handling";

import { CACHE_CONFIG } from "@/config/cache";

import { ImageItemSchema, PagedResultSchema } from "@/schemas";

export type ImageItem = z.infer<typeof ImageItemSchema>;
export type PagedResult = z.infer<typeof PagedResultSchema>;

async function fetchPagedData(
  dataQuery: string,
  start?: number,
  end?: number
): Promise<PagedResult> {
  const safeStart = start ?? 0;
  const safeEnd = end ?? 10000;

  try {
    const data = await client.fetch<PagedResult>(
      dataQuery,
      {
        start: safeStart,
        end: safeEnd,
      },
      { next: { revalidate: CACHE_CONFIG.default } }
    );

    return PagedResultSchema.parse(data);
  } catch (error) {
    const sanityError = new SanityFetchError(dataQuery, error);
    errorLogger.log(sanityError.appError);
    throw sanityError;
  }
}

export async function getRecentWork(
  start: number,
  end: number
): Promise<PagedResult> {
  return fetchPagedData(recentWorkQuery, start, end);
}

export async function getFlash(
  start: number,
  end: number
): Promise<PagedResult> {
  return fetchPagedData(flashQuery, start, end);
}
