import { matchTriggerQueries } from "@felvin-search/core";

export default matchTriggerQueries(["lorem ipsum generator", "lorem ipsum"], {
  substringMatch: true,
});
