import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/json-to-csv",
  name: "json-to-csv",
  description: "Convert a JSON file to CSV",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["json to csv"],
  queryToData,
  Component,
};
export default App;
