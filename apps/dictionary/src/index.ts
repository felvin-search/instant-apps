import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/dictionary",
  name: "Dictionary App",
  description: "A simple dictionary app to define as english word.",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["define gonzo", "farrago meaning"],
};

export default App;
