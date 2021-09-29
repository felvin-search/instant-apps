import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/dice-roller",
  name: "Dice Roller",
  description: "Roll a dice and get a number from 1 to 6",
  queryToData,
  Component,
};

export default App;
