import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/capitals",
  name: "Capitals",
  description: "Given the name of a territory, I show the name of the capital",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "capital of Canada",
    "What is the capital of Bangladesh",
  ],
  queryToData,
  Component,
};
export default App;
