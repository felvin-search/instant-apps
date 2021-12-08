import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/stopwatch",
  name: "stopwatch",
  description: "it is a simple stopwatch",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["stopwatch"],
};

export default App;
