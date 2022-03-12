import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/json-to-yaml",
  name: "JsonToYaml",
  description: "Convert json data to yaml",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["json to yaml"],
};

export default App;
