import { ImageShowcaseSkeleton } from "@/components/image/image-showcase-skeleton";

export default function Loading() {
  return (
    <section className="container lg:px-0">
      <ImageShowcaseSkeleton label="Recent Work" ratio={3 / 4} />
    </section>
  );
}
