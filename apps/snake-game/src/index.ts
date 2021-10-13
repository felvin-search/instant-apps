import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/snake-game",
  name: "Snake Game",
  description: "Play snake game",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["snake game", "play snake"],
};

export default App;
