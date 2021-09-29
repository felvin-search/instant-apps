import { isTriggered } from "@felvin-search/core";
import { evaluate as mathjsEvaluate } from "mathjs";

export default async function ({ query }) {
  console.log("got query", query);
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
    console.log("Error from math app");
    console.log(err);
    return;
  }
}
