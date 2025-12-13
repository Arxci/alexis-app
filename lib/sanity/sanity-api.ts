import { client } from "./sanity-client";
import { flashQuery, recentWorkQuery } from "./sanity-queries";

export async function getRecentWork() {
  return await client.fetch(recentWorkQuery);
}

export async function getFlash() {
  return await client.fetch(flashQuery);
}
