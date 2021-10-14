import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/csv-to-json",
  name: "csv-to-json",
  description: "Convert a CSV file to JSON",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["tic tac toe", "play tic tic toe"],
  queryToData,
  Component,
};
export default App;
