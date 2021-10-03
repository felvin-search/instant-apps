import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/bouncy-ball",
  name: "Bouncy Ball",
  description: "It's just a bouncy ball",
  queryToData,
  Component,
};

export default App;
