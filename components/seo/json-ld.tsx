function sanitizeForJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/<\/script/gi, "<\\/script");
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeForJsonLd(data) }}
    />
  );
}
