import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/capitals",
  name: "Bouncy Ball",
  description: "Given the name of a territory, I show the name of the capital",
  queryToData,
  Component,
};

export default App;
