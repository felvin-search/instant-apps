import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/async-api-validator",
  name: "Async API Validator",
  description: "Validate async api schema",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["validate async api schema", "async api"],

  queryToData,
  Component,
};

export default App;
