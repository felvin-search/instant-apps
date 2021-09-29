import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/currency-convertor",
  name: "Currency Convertor",
  description: "Convert currencies",
  queryToData,
  Component,
};

export default App;
