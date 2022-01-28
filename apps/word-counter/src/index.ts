import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/word-counter",
  name: "Word Counter",
  description: "This counts words, letter/characters",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["word counter", "character count"],
};

export default App;
