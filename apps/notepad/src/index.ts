import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/notepad",
  name: "Notepad",
  description: "Take notes in markdown",
  queryToData,
  Component,
  // screenshotPath: "./files/screenshot.png",
  // exampleSearchQueries: [],
};

export default App;
