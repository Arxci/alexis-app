import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Project ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Dataset is required"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1, "API Version is required"),
  // Add other env vars here (e.g. KV_REST_API_URL for rate limiting later)
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const ImageItemSchema = z.object({
  _key: z.string(),
  alt: z.string().catch("Tattoo artwork"), // Fallback if missing
  imageUrl: z.string().url(),
  thumbUrl: z.string().url(),
  blurDataURL: z.string().optional(),
  dimensions: z
    .object({
      width: z.number(),
      height: z.number(),
      aspectRatio: z.number(),
    })
    .optional(),
});

export const PagedResultSchema = z.object({
  items: z.array(ImageItemSchema),
  totalCount: z.number().nonnegative(),
});
