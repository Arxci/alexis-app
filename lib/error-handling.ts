import React from "react";

export enum ErrorType {
  IMAGE_LOAD = "IMAGE_LOAD",
  SANITY_FETCH = "SANITY_FETCH",
  QUERY_ERROR = "QUERY_ERROR",
  NETWORK = "NETWORK",
  VALIDATION = "VALIDATION",
  UNKNOWN = "UNKNOWN",
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  timestamp: Date;
  context?: Record<string, unknown>;
}

class ErrorLogger {
  private isDevelopment = process.env.NODE_ENV === "development";

  log(error: AppError): void {
    if (this.isDevelopment) {
      console.error(`[${error.type}] ${error.message}`, {
        timestamp: error.timestamp,
        context: error.context,
        originalError: error.originalError,
      });
    } else {
      console.error(`[${error.type}] ${error.message}`);
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      console.warn(`[WARNING] ${message}`, context);
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context);
    }
  }
}

export const errorLogger = new ErrorLogger();

export function createImageLoadError(
  imageUrl: string,
  originalError?: unknown
): AppError {
  return {
    type: ErrorType.IMAGE_LOAD,
    message: "Failed to load image",
    originalError,
    timestamp: new Date(),
    context: { imageUrl },
  };
}

export function createValidationError(
  message: string,
  context?: Record<string, unknown>
): AppError {
  return {
    type: ErrorType.VALIDATION,
    message,
    timestamp: new Date(),
    context,
  };
}

export function createSanityFetchError(
  query: string,
  originalError?: unknown
): AppError {
  return {
    type: ErrorType.SANITY_FETCH,
    message: "Failed to fetch data from Sanity CMS",
    originalError,
    timestamp: new Date(),
    context: { query },
  };
}

export function createQueryError(
  queryKey: string[],
  originalError?: unknown
): AppError {
  return {
    type: ErrorType.QUERY_ERROR,
    message: "Query failed",
    originalError,
    timestamp: new Date(),
    context: { queryKey },
  };
}

export function handleImageError(
  imageUrl: string,
  onError: () => void
): React.ReactEventHandler<HTMLImageElement> {
  return (event) => {
    const error = createImageLoadError(imageUrl, event);
    errorLogger.log(error);
    onError();
  };
}

export async function handleSanityError<T>(
  fetchFn: () => Promise<T>,
  query: string,
  retries = 3
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    const appError = createSanityFetchError(query, error);
    errorLogger.log(appError);

    if (retries > 0) {
      errorLogger.info(`Retrying Sanity fetch, ${retries} attempts remaining`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return handleSanityError(fetchFn, query, retries - 1);
    }

    throw appError;
  }
}

export function getUserFriendlyErrorMessage(error: AppError): string {
  switch (error.type) {
    case ErrorType.IMAGE_LOAD:
      return "Unable to load image. Please try refreshing the page.";
    case ErrorType.SANITY_FETCH:
      return "Unable to load content. Please check your connection and try again.";
    case ErrorType.QUERY_ERROR:
      return "Something went wrong. Please try again.";
    case ErrorType.NETWORK:
      return "Network error. Please check your internet connection.";
    case ErrorType.VALIDATION:
      return "Invalid request. Please try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

export function isQueryError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: string }).message === "string"
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (isQueryError(error)) return (error as { message: string }).message;
  return "An unknown error occurred";
}
