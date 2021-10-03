import React from "react";
import { InstantAppProps, queryToDataInput } from "@felvin-search/core";

function Component(props: InstantAppProps) {
  return <strong>{props.data.joke}</strong>;
}

async function queryToData({ query }: queryToDataInput) {
  const triggerWords = ["joke", "jokes", "tell me a joke", "random joke"];
  if (!triggerWords.includes(query.toLowerCase())) {
    return;
  }

  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
      "User-Agent": "Felvin Search (felvin.com)",
    },
  });
  if (!response.ok) {
    return;
  }

  const responseJson = await response.json();

  if (!responseJson?.joke) {
    return;
  }

  return { joke: responseJson.joke };
}

export { queryToData, Component };
