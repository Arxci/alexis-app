import { ImageShowcase } from "../../../components/image/image-showcase";
import { ImageCard } from "@/components/image/image-card";

import { getFlash } from "@/lib/sanity/sanity-api";

import { errorLogger, ErrorType } from "@/lib/error-handling";

export const HomeFlash = async () => {
  let items: Awaited<ReturnType<typeof getFlash>>["items"] = [];

  try {
    const result = await getFlash(0, 3);
    items = result.items;
  } catch (error) {
    // Error already logged in getFlash, but log context
    errorLogger.log({
      type: ErrorType.SANITY_FETCH,
      message: "Failed to load flash section on home page",
      originalError: error,
      timestamp: new Date(),
      context: { section: "HomeFlash" },
    });
  }

  return (
    <section className="container">
      <ImageShowcase label="Flash" link="/flash">
        {items &&
          items.map((image) => (
            <ImageCard key={image._key} ratio={16 / 9} {...image} />
          ))}
      </ImageShowcase>
    </section>
  );
};
