import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/csv-to-json",
  name: "CSV to JSON",
  description: "Convert a csv to json",
  queryToData,
  Component,
};

export default App;
