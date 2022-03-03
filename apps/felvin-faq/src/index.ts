import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/felvin-faq",
  name: "Felvin FAQ",
  description: "Shows answers to common Felvin FAQ questions",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["Felvin legal name"],
};

export default App;
