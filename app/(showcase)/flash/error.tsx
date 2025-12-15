"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FlashError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container lg:px-0">
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Failed to load flash designs
        </h2>
        <p className="mb-6 text-stone-600">
          We couldn&apos;t load the gallery. Please try again.
        </p>
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
      </Card>
    </section>
  );
}
