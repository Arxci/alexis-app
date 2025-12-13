"use server";

import { getRecentWork } from "@/lib/sanity/sanity-api";

export async function fetchMoreRecentWork(start: number, end: number) {
  return await getRecentWork(start, end, false);
}
