import { client } from "./sanity-client";
import { recentWorkQuery } from "./sanity-queries";

export async function getRecentWork() {
  return await client.fetch(recentWorkQuery);
}
