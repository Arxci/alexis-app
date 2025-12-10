import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const HomeBanner = () => {
  return (
    <section className="container">
      <ImagePlaceholder
        aspectRatio={16 / 7}
        className="rounded-bl-md rounded-br-md"
      />
    </section>
  );
};
