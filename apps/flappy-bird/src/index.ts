import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/flappy-bird",
  name: "FlappyBird",
  description: "A flappy bird game for when you are bored!",
  queryToData,
  Component,
};
export default App;
