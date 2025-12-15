"use server";

import { getFlash } from "@/lib/sanity/sanity-api";
import { validatePaginationParams } from "@/lib/validation";
import { errorLogger, ErrorType } from "@/lib/error-handling";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function fetchMoreFlash(start: number, end: number) {
  try {
    const params = validatePaginationParams(start, end);
    return await getFlash(params.start, params.end);
  } catch (error) {
    errorLogger.log({
      type: ErrorType.SANITY_FETCH,
      message: "Failed to fetch flash images",
      originalError: error,
      timestamp: new Date(),
      context: { start, end },
    });

    return { items: [], totalCount: 0 };
  }
}
