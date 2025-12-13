import { groq } from "next-sanity";

export const recentWorkQuery = groq`
  (*[_type == "images"].recentWork[])[$start..$end] {
    _key,
    alt,
    "imageUrl": asset->url
  }
`;

export const flashQuery = groq`
  (*[_type == "images"].flash[])[$start..$end] {
    _key,  
    alt,
    "imageUrl": asset->url
  }
`;

export const flashCountQuery = groq`
  count(*[_type == "images"].flash[])
`;

export const recentWorkCountQuery = groq`
  count(*[_type == "images"].recentWork[])
`;
