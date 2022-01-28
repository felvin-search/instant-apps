import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/tv-shows",
  name: "TV Shows",
  description: "An instant app which shows info about tv shows",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "breaking bad",
    "friends tv show",
    "the office series",
  ],
};

export default App;
