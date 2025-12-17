import { envSchema } from "@/schemas";

// Validate process.env safely
const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
  if (!parsedEnv.success) {
    throw new Error(
      "Invalid environment variables: " +
        JSON.stringify(parsedEnv.error.format())
    );
  }
}

export const env = parsedEnv.data;
