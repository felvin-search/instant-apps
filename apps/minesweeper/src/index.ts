import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/minesweeper",
  name: "minesweeper",
  description: "Instant app for our nostalgic game minesweeper",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
   exampleSearchQueries: ["minesweeper","play minesweeper"],
};

export default App;
