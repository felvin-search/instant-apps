import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/yaml-to-json",
  name: "yaml to json",
  description: "Yaml to JSON",
  queryToData,
  Component,
  // screenshotPath: "./files/screenshot.png",
  // exampleSearchQueries: [],
};

export default App;
