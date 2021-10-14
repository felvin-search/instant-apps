import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/tic-tac-toe",
  name: "Tic-Tac-Toe",
  description: "Play Tic-Tac-Toe with someone or yourself",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["tic tac toe", "play tic tic toe"],
  queryToData,
  Component,
};
export default App;
