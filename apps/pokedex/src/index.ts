import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/pokedex",
  name: "Pokedex",
  description: "An instant app that shows stats of pokemon",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["regirock stats", "bulbasaur info"],
};

export default App;
