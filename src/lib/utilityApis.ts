import type { queryToData } from "../apps/types";

/**
 * @param substringMatch (Default: false) By default, trigger queries will have to identical with the user search query for a successful match. If set to true, the trigger query only needs to be a substring of the user search query.
 * @param caseSensitive (Default: false) By default all the strings will be converted to lowercase for comparison.
 * If caseSensitive is true, the exact case of the trigger queries as well as user search query will be used.
 */
type matchTriggerQueriesOptions = {
  substringMatch?: boolean;
  caseSensitive?: boolean;
};

/**
 * Simple utility function which can be assigned to dataToQuery when an app should trigger
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
 * @param options @see matchTriggerQueriesOptions
 */
export function matchTriggerQueries(
  triggerQueries: Array<string>,
  options?: matchTriggerQueriesOptions
): queryToData {
  // Return a function of type queryToData
  return async ({ query }: { query: string }) => {
    for (const triggerQuery of triggerQueries) {
      if (triggerQuery === "") {
        throw new Error(
          "Empty trigger query is not allowed, since it will match every query."
        );
      }

      if (options?.caseSensitive && !options?.substringMatch) {
        if (query === triggerQuery) {
          return { query };
        }
      } else if (!options?.substringMatch) {
        if (query.toLowerCase() === triggerQuery.toLowerCase()) {
          return { query };
        }
      } else if (options?.caseSensitive) {
        if (query.includes(triggerQuery)) {
          return { query };
        }
      } else {
        if (query.toLowerCase().includes(triggerQuery.toLowerCase())) {
          return { query };
        }
      }
    }

    return;
  };
}
