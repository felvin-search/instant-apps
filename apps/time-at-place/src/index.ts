import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/time-at-place",
  name: "Time at place",
  description: "App which shows time at places",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["Time in India", "Time in Mexico"],
  queryToData,
  Component,
};
export default App;
