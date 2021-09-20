import { InstantAppProps } from "@felvin-search/core";
import React from "react";
import Dice from "react-dice-roll";

function Component({ data }: InstantAppProps): JSX.Element {
  return <Dice defaultValue={data.defaultValue} />;
}

export default Component;
