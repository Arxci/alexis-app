import type { ReactEventHandler } from "react";

export enum ErrorType {
  IMAGE_LOAD = "IMAGE_LOAD",
  SANITY_FETCH = "SANITY_FETCH",
  QUERY_ERROR = "QUERY_ERROR",
  NETWORK = "NETWORK",
  VALIDATION = "VALIDATION",
  UNKNOWN = "UNKNOWN",
}

export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  timestamp: Date;
  context?: Record<string, unknown>;
}

abstract class BaseAppError extends Error {
  public abstract readonly appError: AppError;

  constructor(message: string) {
    super(message);
    // Maintains proper stack trace in V8 environments
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class SanityFetchError extends BaseAppError {
  public readonly appError: AppError;

  constructor(query: string, originalError: unknown) {
    super("Failed to fetch data from Sanity CMS");
    this.name = "SanityFetchError";
    this.appError = {
      type: ErrorType.SANITY_FETCH,
      message: "Failed to fetch data from Sanity CMS",
      originalError,
      timestamp: new Date(),
      context: { query },
    };
  }
}

export class ValidationError extends BaseAppError {
  public readonly appError: AppError;

  constructor(message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = "ValidationError";
    this.appError = {
      type: ErrorType.VALIDATION,
      message,
      timestamp: new Date(),
      context,
    };
  }
}

export class ImageLoadError extends BaseAppError {
  public readonly appError: AppError;

  constructor(imageUrl: string, originalError?: unknown) {
    super("Failed to load image");
    this.name = "ImageLoadError";
    this.appError = {
      type: ErrorType.IMAGE_LOAD,
      message: "Failed to load image",
      originalError,
      timestamp: new Date(),
      context: { imageUrl },
    };
  }
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
      // In production, log minimal info
      // TODO: Integrate with error monitoring service (Sentry, etc.)
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

export function createAppError(
  type: ErrorType,
  message: string,
  originalError?: unknown,
  context?: Record<string, unknown>
): AppError {
  return {
    type,
    message,
    originalError,
    timestamp: new Date(),
    context,
  };
}

export function isAppError(error: unknown): error is BaseAppError {
  return (
    error instanceof SanityFetchError ||
    error instanceof ValidationError ||
    error instanceof ImageLoadError
  );
}

export function isKnownError(error: unknown): boolean {
  return isAppError(error);
}

export function handleImageError(
  imageUrl: string,
  onError: () => void
): ReactEventHandler<HTMLImageElement> {
  return (event) => {
    const error = new ImageLoadError(imageUrl, event);
    errorLogger.log(error.appError);
    onError();
  };
}

export function getUserFriendlyMessage(error: AppError | BaseAppError): string {
  const appError = "appError" in error ? error.appError : error;

  switch (appError.type) {
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

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
}
