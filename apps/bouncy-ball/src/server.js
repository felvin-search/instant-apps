import { matchTriggerQueries } from "@felvin-search/core";

const queryToData = matchTriggerQueries([
  "bouncy ball",
  "ball bouncing",
  "ball bounce",
  "bouncing ball",
]);

export default queryToData;
