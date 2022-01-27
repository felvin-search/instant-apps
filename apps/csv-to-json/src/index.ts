import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/csv-to-json",
  name: "csv-to-json",
  description: "Convert a CSV file to JSON",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["csv to json"],
  queryToData,
  Component,
};
export default App;
