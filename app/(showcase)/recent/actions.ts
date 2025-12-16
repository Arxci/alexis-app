"use server";

import { getRecentWork } from "@/lib/sanity/sanity-api";
import { validatePaginationParams } from "@/lib/validation";
import {
  createAppError,
  errorLogger,
  ErrorType,
  isKnownError,
} from "@/lib/error-handling";

export async function fetchMoreRecentWork(start: number, end: number) {
  try {
    const params = validatePaginationParams(start, end);
    return await getRecentWork(params.start, params.end);
  } catch (error) {
    if (!isKnownError(error)) {
      errorLogger.log(
        createAppError(
          ErrorType.UNKNOWN,
          "Unexpected error in fetchMoreRecentWork",
          error,
          { start, end }
        )
      );
    }

    throw error;
  }
}
