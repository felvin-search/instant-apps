import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/capitals",
  name: "Capitals",
  description: "Given the name of a territory, I show the name of the capital",
  queryToData,
  Component,
};
export default App;
