import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/async-api-validator",
  name: "Async API Validator",
  description: "Validate async api schema",
  queryToData,
  Component,
};

export default App;
