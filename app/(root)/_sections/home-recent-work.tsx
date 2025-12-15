import { ImageShowcase } from "../../../components/image/image-showcase";
import { ImageCard } from "@/components/image/image-card";

import { getRecentWork } from "@/lib/sanity/sanity-api";

import { errorLogger, ErrorType } from "@/lib/error-handling";

export const HomeRecentWork = async () => {
  let items: Awaited<ReturnType<typeof getRecentWork>>["items"] = [];

  try {
    const result = await getRecentWork(0, 3);
    items = result.items;
  } catch (error) {
    // Error already logged in getRecentWork, but log context
    errorLogger.log({
      type: ErrorType.SANITY_FETCH,
      message: "Failed to load recent work section on home page",
      originalError: error,
      timestamp: new Date(),
      context: { section: "HomeRecentWork" },
    });
  }

  return (
    <section className="container">
      <ImageShowcase label="Recent Work" link="/recent">
        {items &&
          items.map((image) => (
            <ImageCard key={image._key} ratio={3 / 4} {...image} />
          ))}
      </ImageShowcase>
    </section>
  );
};
