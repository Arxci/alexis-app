import ShowcaseLoading from "../_components/showcase-loading";

export default function Loading() {
  return (
    <section className="container lg:px-0">
      <ShowcaseLoading label="Flash" ratio={16 / 9} />
    </section>
  );
}
