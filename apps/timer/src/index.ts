import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/timer",
  name: "Countdown timer",
  description: "Set an instant timer using search. e.g. 15 minutes timer",
  queryToData,
  Component,
};

export default App;
