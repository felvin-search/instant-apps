import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/live-markdown",
  name: "live markdown",
  description: "Renders mardown text in md.",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["live markdown preview"],
};

export default App;
