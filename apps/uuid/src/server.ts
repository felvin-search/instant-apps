import { isTriggered } from "@felvin-search/core";
import { v4 as uuidv4 } from "uuid";

// @DoNotCacheMe
export default async function ({ query }: { query: string }) {
  const triggerQueries = ["uuid", "uuidv4"];
  if (!isTriggered(query, triggerQueries, { substringMatch: true })) return;
  return { uuid: uuidv4() };
}
