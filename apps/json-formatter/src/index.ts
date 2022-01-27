import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/json-formatter",
  name: "JSONFormatter",
  description:
    "Formats the JSON with right indentation for easier human consumption",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["format json"],
};
export default App;
