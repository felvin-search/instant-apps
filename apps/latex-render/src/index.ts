import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/latex-render",
  name: "Latex Renderer",
  description: "Enter latex strings to generate output on the fly",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["render latex"],
  queryToData,
  Component,
};
export default App;
