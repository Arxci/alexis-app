// app/(showcase)/recent/actions.ts
"use server";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { validatePaginationParams } from "@/lib/validation";

export async function fetchMoreRecentWork(start: number, end: number) {
  const params = validatePaginationParams(start, end);

  return await getRecentWork(params.start, params.end);
}
