import { groq } from "next-sanity";

const buildImageUrls = (baseQuery: string) => `
  ${baseQuery} {
    _key,
    alt,
    "imageUrl": asset->url + "?w=1200&q=75&auto=format&fit=max",
    "thumbUrl": asset->url + "?w=400&q=75&auto=format&fit=max",
    "mediumUrl": asset->url + "?w=800&q=75&auto=format&fit=max",
    "largeUrl": asset->url + "?w=1920&q=80&auto=format&fit=max",
    "blurDataURL": asset->metadata.lqip,
    "dimensions": asset->metadata.dimensions
  }
`;

export const recentWorkQuery = groq`
  ${buildImageUrls('(*[_type == "images"].recentWork[])[$start...$end]')}
`;

export const flashQuery = groq`
  ${buildImageUrls('(*[_type == "images"].flash[])[$start...$end]')}
`;

export const flashCountQuery = groq`
  count(*[_type == "images"].flash[])
`;

export const recentWorkCountQuery = groq`
  count(*[_type == "images"].recentWork[])
`;
