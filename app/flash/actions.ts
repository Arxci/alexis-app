"use server";

import { getFlashPaged } from "@/lib/sanity/sanity-api";

export async function fetchMoreFlashImages(start: number, end: number) {
  return await getFlashPaged(start, end);
}
