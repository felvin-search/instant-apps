import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/json-formatter",
  name: "JSON Formatter",
  description:
    "Formats the JSON with right indentation for easier human consumption",
  queryToData,
  Component,
};

export default App;
