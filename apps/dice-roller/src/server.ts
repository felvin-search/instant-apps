import { isTriggered, queryToDataInput } from "@felvin-search/core";

async function queryToData({
  query,
}: queryToDataInput): Promise<{ defaultValue: number } | undefined> {
  if (!isTriggered(query, ["roll a dice", "dice", "ludo"])) {
    return;
  }

  // Return 1 to 6
  const defaultValue = Math.floor(Math.random() * 6) + 1;

  return { defaultValue };
}

export default queryToData;
