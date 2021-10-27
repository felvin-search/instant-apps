import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/sudoku",
  name: "Sudoku",
  description: "A Sudoku puzzle game",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["play sudoku", "sudoku"],
};

export default App;
