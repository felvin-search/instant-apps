import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/tic-tac-toe",
  name: "Tic Tac Toe",
  description: "Play Tic-Tac-Toe with someone or yourself",
  queryToData,
  Component,
};

export default App;
