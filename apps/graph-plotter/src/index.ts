import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/graph-plotter",
  name: "Graph Plotter",
  description:
    "This App plots graph of functions that are passed in input. Extremes of x and y axis can be adjusted too",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["plot graph", "plotter"],
};

export default App;
