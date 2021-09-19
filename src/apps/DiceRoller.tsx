import Dice from "react-dice-roll";
import { isTriggered } from "../lib/utilityApis";
import { InstantApp, InstantAppProps, queryToDataInput } from "./types";

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

const DiceRoller: InstantApp = {
  name: "DiceRoller",
  description: "Roll a dice and get a number from 1 to 6",
  queryToData,
  Component,
};

export default DiceRoller;
