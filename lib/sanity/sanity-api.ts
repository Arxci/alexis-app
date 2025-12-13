import { client } from "./sanity-client";
import { flashQuery, recentWorkQuery } from "./sanity-queries";

export type RecentWorkQueryResult = {
  alt: string;
  imageUrl: string;
}[];

export async function getRecentWorkHome(): Promise<RecentWorkQueryResult> {
  return await client.fetch(recentWorkQuery, { start: 0, end: 2 });
}

export async function getRecentWorkPaged(
  start: number,
  end: number
): Promise<RecentWorkQueryResult> {
  return await client.fetch(recentWorkQuery, { start, end });
}

export type FlashQueryResult = {
  alt: string;
  imageUrl: string;
}[];

export async function getFlashHome(): Promise<FlashQueryResult> {
  return await client.fetch(flashQuery, { start: 0, end: 2 });
}

export async function getFlashPaged(
  start: number,
  end: number
): Promise<FlashQueryResult> {
  return await client.fetch(flashQuery, { start, end });
}
