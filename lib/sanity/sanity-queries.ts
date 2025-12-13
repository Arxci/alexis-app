import { groq } from "next-sanity";

export const recentWorkQuery = groq`
  (*[_type == "images"].recentWork[])[$start..$end] {
    alt,
    "imageUrl": asset->url
  }
`;

export const flashQuery = groq`
  (*[_type == "images"].flash[])[$start..$end] {
    alt,
    "imageUrl": asset->url
  }
`;
