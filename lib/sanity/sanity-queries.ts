import { groq } from "next-sanity";

const buildImageUrls = (baseQuery: string) => `
  ${baseQuery} {
    _key,
    alt,
    "imageUrl": asset->url + "?w=1200&q=75&auto=format&fit=max",
    "thumbUrl": asset->url + "?w=400&q=75&auto=format&fit=max",
    "blurDataURL": asset->metadata.lqip,
    "dimensions": asset->metadata.dimensions
  }
`;

export const recentWorkQuery = groq`
{
  "items":${buildImageUrls('(*[_type == "images"].recentWork[defined(asset)])[$start...$end]')},
  "totalCount": count(*[_type == "images"].recentWork[defined(asset)])
}
`;

export const flashQuery = groq`
{
  "items":${buildImageUrls('(*[_type == "images"].flash[defined(asset)])[$start...$end]')},
  "totalCount": count(*[_type == "images"].flash[defined(asset)])
}
`;

export const flashCountQuery = groq`
  count(*[_type == "images"].flash[])
`;

export const recentWorkCountQuery = groq`
  count(*[_type == "images"].recentWork[])
`;
