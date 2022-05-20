import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/competitive-contest-app",
  name: "competitive-contest-app",
  description: "List of contest for Cp",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["cp contest", "coding practice", "coding"],
};

export default App;
