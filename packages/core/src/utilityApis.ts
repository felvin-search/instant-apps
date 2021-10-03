import type { queryToData } from "./types";

/**
 * @param substringMatch (Default: false) By default, trigger queries will have to identical with the user search query for a successful match. If set to true, the trigger query only needs to be a substring of the user search query.
 * @param caseSensitive (Default: false) By default all the strings will be converted to lowercase for comparison.
 * If caseSensitive is true, the exact case of the trigger queries as well as user search query will be used.
 */
type triggerQueriesOptions = {
  substringMatch?: boolean;
  caseSensitive?: boolean;
};

/**
 * Simple utility function to be used inside the queryToData for quickly matching trigger queries.
 *
 * Example (Dice roller app)
 *
 * async function queryToData({ query }: queryToDataInput) {
 *   if (!isTriggered(query, ["roll a dice", "dice", "ludo"])) {
 *     return;
 *   }
 *
 *   // Return 1 to 6
 *   const defaultValue = Math.floor(Math.random() * 6) + 1;
 *
 *   return { defaultValue };
 * }
 *
 * @param triggerQueries One or more trigger strings that the app wants to render for.
 * @param options @see triggerQueriesOptions
 */
export function isTriggered(
  query: string,
  triggerQueries: Array<string>,
  options?: triggerQueriesOptions
): boolean {
  for (const triggerQuery of triggerQueries) {
    if (triggerQuery === "") {
      throw new Error(
        "Empty trigger query is not allowed, since it will match every query."
      );
    }

    if (options?.caseSensitive && !options?.substringMatch) {
      if (query === triggerQuery) {
        return true;
      }
    } else if (!options?.substringMatch) {
      if (query.toLowerCase() === triggerQuery.toLowerCase()) {
        return true;
      }
    } else if (options?.caseSensitive) {
      if (query.includes(triggerQuery)) {
        return true;
      }
    } else {
      if (query.toLowerCase().includes(triggerQuery.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Simple utility function which can be assigned to queryToData when an app should trigger
 * based on one or more keywords.
 *
 * Example
 *
 * const MyApp = {
 *   name: "JSON formatter",
 *   description: "Parse and pretty print formatted JSON",
 *   queryToData: matchTriggerQueries(["format json", "json format"], { substringMatch: true })
 *   Component: Renderer,
 * };
 *
 * @param triggerQueries One or more trigger strings that the app wants to render for.
 * @param options @see triggerQueriesOptions
 */
export function matchTriggerQueries(
  triggerQueries: Array<string>,
  options?: triggerQueriesOptions
): queryToData {
  // Return a function of type queryToData
  return async ({ query }: { query: string }) => {
    return isTriggered(query, triggerQueries, options);
  };
}
