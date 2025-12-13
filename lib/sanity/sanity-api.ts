import { client } from "./sanity-client";
import { flashQuery, recentWorkQuery } from "./sanity-queries";

export type RecentWorkQueryResult = {
  alt: string;
  imageUrl: string;
}[];

export async function getRecentWork(): Promise<RecentWorkQueryResult> {
  return await client.fetch(recentWorkQuery);
}

export type FlashQueryResult = {
  alt: string;
  imageUrl: string;
}[];

export async function getFlash(): Promise<FlashQueryResult> {
  return await client.fetch(flashQuery);
}
