"use server";

import { headers } from "next/headers";

import { getRecentWork, type PagedResult } from "@/lib/sanity/sanity-api";
import { validatePaginationParams } from "@/lib/validation";
import {
  ActionResponse,
  createAppError,
  errorLogger,
  ErrorType,
  isKnownError,
} from "@/lib/error-handling";
import { rateLimit } from "@/lib/rate-limit";

export async function fetchMoreRecentWork(
  start: number,
  end: number
): Promise<ActionResponse<PagedResult>> {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(ip, 20, 60000);
    if (!success) {
      return { success: false, error: "Too many requests. Please try again." };
    }
  } catch (e) {
    console.warn("Rate limit check failed", e);
  }

  try {
    const params = validatePaginationParams(start, end);
    const data = await getRecentWork(params.start, params.end);
    return { success: true, data };
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
    return {
      success: false,
      error: "Failed to load recent work. Please try again.",
    };
  }
}
