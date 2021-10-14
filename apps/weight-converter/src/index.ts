import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/weight-converter",
  name: "Weight Converter",
  description: "Converts weight from one unit to another",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["convert 5 kg to pounds"],
};

export default App;
