import { isTriggered } from "@felvin-search/core";
import fetch from "node-fetch";

const triggerWords = ["define", "meaning"];
function cleanQuery(query) {
  let newQuery = query;
  triggerWords.forEach((word) => (newQuery = newQuery.replace(word, "")));
  newQuery = newQuery.trim();
  return newQuery;
}

export default async function queryToData({ query }) {
  // If the query does not contain the following words, do not trigger the app
  // `define`, `meaning`
  if (!isTriggered(query, triggerWords, { substringMatch: true })) return;
  const cleanedQuery = cleanQuery(query);

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en_US/${cleanedQuery}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Something went wrong with API request. Status ${response.status} ${response.statusText} ${data}`
    );
  }

  if (data && Array.isArray(data) && data.length > 0) {
    return data[0];
  }
}
