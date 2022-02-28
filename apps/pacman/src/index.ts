import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/pacman",
  name: "pacman",
  description: "pacman game intergration with felvin",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["pacman", "play pacman"],
};

export default App;
