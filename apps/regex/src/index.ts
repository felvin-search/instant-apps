import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/regex",
  name: "Regex-Validator",
  description: "Checks whether the regex matches the String",
  queryToData,
  Component,
};

export default App;
