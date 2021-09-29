// import { InstantAppProps } from "@felvin-search/core";
import React from "react";
import Dice from "react-dice-roll";

function Component({ data }) {
  return <Dice defaultValue={data.defaultValue} />;
}

export default Component;
