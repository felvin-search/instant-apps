import { isTriggered } from "@felvin-search/core";
import { evaluate as mathjsEvaluate } from "mathjs";

export default async function ({ query }) {
  if (
    !isTriggered(query, ["+", "-", "*", "/", "%", "^"], {
      substringMatch: true,
    })
  )
    return;

  try {
    const result = JSON.stringify(mathjsEvaluate(query));
    return { result };
  } catch (err) {
    return;
  }
}
