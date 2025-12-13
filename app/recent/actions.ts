"use server";

import { getRecentWorkPaged } from "@/lib/sanity/sanity-api";

export async function fetchMoreRecentWork(start: number, end: number) {
  return await getRecentWorkPaged(start, end);
}
