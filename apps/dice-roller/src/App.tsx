import React from "react";
import Dice from "react-dice-roll";
import {
  InstantAppProps,
  queryToDataInput,
  isTriggered,
} from "@felvin-search/core";

function Component({ data }: InstantAppProps) {
  return <Dice defaultValue={data.defaultValue} />;
}

async function queryToData({ query }: queryToDataInput) {
  if (!isTriggered(query, ["roll a dice", "dice", "ludo"])) {
    return;
  }

  // Return 1 to 6
  const defaultValue = Math.floor(Math.random() * 6) + 1;

  return { defaultValue };
}

export { Component, queryToData };
