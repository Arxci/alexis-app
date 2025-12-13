"use server";

import { getFlash } from "@/lib/sanity/sanity-api";

export async function fetchMoreFlashImages(start: number, end: number) {
  return await getFlash(start, end, false);
}
