import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/currency-convertor",
  name: "Currency Convertor",
  description: "Converts currencies",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["100 usd to inr", "50 eur to usd"],
};
export default App;
