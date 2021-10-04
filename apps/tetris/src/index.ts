import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/tetris",
  name: "Tetris Game",
  description: "Play tetris game",
  queryToData,
  Component,
};
export default App;
