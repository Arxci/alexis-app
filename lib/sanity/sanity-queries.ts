import { groq } from "next-sanity";

export const recentWorkQuery = groq`
  *[_type == "images"].recentWork[] {
    alt,
    "imageUrl": asset->url
  }
`;

export const flashQuery = groq`
  *[_type == "images"].flash[] {
    alt,
    "imageUrl": asset->url
  }
`;
