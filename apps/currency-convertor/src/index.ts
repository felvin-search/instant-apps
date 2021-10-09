import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/currency-convertor",
  name: "Currency Convertor",
  description: "Converts currencies",
  queryToData,
  Component,
};
export default App;
