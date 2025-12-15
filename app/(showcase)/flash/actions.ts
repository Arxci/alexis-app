"use server";

import { getFlash } from "@/lib/sanity/sanity-api";
import { validatePaginationParams } from "@/lib/validation";
import {
  createAppError,
  errorLogger,
  ErrorType,
  isKnownError,
} from "@/lib/error-handling";

const EMPTY_RESULT = { items: [], totalCount: 0 };

export async function fetchMoreFlash(start: number, end: number) {
  try {
    const params = validatePaginationParams(start, end);
    return await getFlash(params.start, params.end);
  } catch (error) {
    if (!isKnownError(error)) {
      errorLogger.log(
        createAppError(
          ErrorType.UNKNOWN,
          "Unexpected error in fetchMoreFlashImages",
          error,
          { start, end }
        )
      );
    }

    return EMPTY_RESULT;
  }
}
