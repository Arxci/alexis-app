// lib/validation.ts
import {
  errorLogger,
  createValidationError,
  getUserFriendlyErrorMessage,
  AppError,
} from "./error-handling";

export const MAX_PAGE_SIZE = 100;

export class ValidationError extends Error {
  public readonly appError: AppError;

  constructor(message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = "ValidationError";
    this.appError = createValidationError(message, context);
  }
}

export function validatePaginationParams(
  start: unknown,
  end: unknown
): { start: number; end: number } {
  // Type validation
  if (typeof start !== "number" || typeof end !== "number") {
    const error = new ValidationError("Pagination parameters must be numbers", {
      receivedStart: typeof start,
      receivedEnd: typeof end,
    });
    errorLogger.log(error.appError);
    throw error;
  }

  // Check for NaN
  if (Number.isNaN(start) || Number.isNaN(end)) {
    const error = new ValidationError("Pagination parameters cannot be NaN", {
      start,
      end,
    });
    errorLogger.log(error.appError);
    throw error;
  }

  const safeStart = Math.max(0, Math.floor(start));
  const safeEnd = Math.min(
    safeStart + MAX_PAGE_SIZE,
    Math.max(safeStart, Math.floor(end))
  );

  return { start: safeStart, end: safeEnd };
}
