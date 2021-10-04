import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/json-formatter",
  name: "JSONFormatter",
  description:
    "Formats the JSON with right indentation for easier human consumption",
  queryToData,
  Component,
};
export default App;
