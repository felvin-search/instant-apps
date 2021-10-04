import React from "react";
import Snake from "snake-game-react";
import { matchTriggerQueries } from "@felvin-search/core";

function Component({ data }) {
  return <Snake color1="#248ec2" color2="#1d355e" backgroundColor="#ebebeb" />;
}

const queryToData = matchTriggerQueries([
  "snake game",
  "play snake",
  "play snake game",
]);

export { Component, queryToData };
