import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/weight-converter",
  name: "Weight Converter",
  description: "Converts weights from one unit to another",
  queryToData,
  Component,
};

export default App;
