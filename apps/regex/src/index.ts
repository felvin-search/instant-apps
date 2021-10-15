import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/regex",
  name: "Regex-Validator",
  description: "Checks whether the regex matches the String",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "check regex",
    "match regex",
    "regex validator",
    "regex checker",
    "regex tester",
  ],
};

export default App;
