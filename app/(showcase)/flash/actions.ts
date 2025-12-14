// app/(showcase)/flash/actions.ts
"use server";

import { getFlash } from "@/lib/sanity/sanity-api";
import { validatePaginationParams } from "@/lib/validation";

export async function fetchMoreFlashImages(start: number, end: number) {
  const params = validatePaginationParams(start, end);
  return await getFlash(params.start, params.end, false);
}
