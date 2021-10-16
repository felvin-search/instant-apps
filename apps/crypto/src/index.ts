import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/crypto",
  name: "cryptocurrency",
  description: "Provides crypto currency prices",
  queryToData,
  Component,
  // screenshotPath: "./files/screenshot.png",
  // exampleSearchQueries: [],
};

export default App;
