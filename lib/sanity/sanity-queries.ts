import { groq } from "next-sanity";

export const recentWorkQuery = groq`
  (*[_type == "images"].recentWork[])[$start...$end] {
    _key,
    alt,
    "imageUrl": asset->url + "?w=1200&h=900&fit=max&q=75&auto=format",
    "blurDataURL": asset->metadata.lqip
  }
`;

export const flashQuery = groq`
  (*[_type == "images"].flash[])[$start...$end] {
    _key,  
    alt,
    "imageUrl": asset->url + "?w=1200&h=900&fit=max&q=75&auto=format",
    "blurDataURL": asset->metadata.lqip
  }
`;

export const flashCountQuery = groq`
  count(*[_type == "images"].flash[])
`;

export const recentWorkCountQuery = groq`
  count(*[_type == "images"].recentWork[])
`;
