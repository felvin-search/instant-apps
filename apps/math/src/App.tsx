import React from "react";
import { evaluate as mathjsEvaluate } from "mathjs";
import { isTriggered, InstantAppProps } from "@felvin-search/core";

function Component(props: InstantAppProps) {
  return <h1>{props.data?.result}</h1>;
}

const queryToData = async ({ query }) => {
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
};

export { queryToData, Component };
