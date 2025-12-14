// config/cache.ts
export const CACHE_CONFIG = {
  /** Default revalidation time for most pages (1 hour) */
  default: 3600,
  /** Revalidation time for frequently updated content (5 minutes) */
  frequent: 300,
  /** Revalidation time for static content (1 day) */
  static: 86400,
} as const;

export type CacheConfig = typeof CACHE_CONFIG;
