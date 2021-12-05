import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/unit-convertor",
  name: "Unit Converter",
  description: "an app for conversion between different units of measurement for the same quantity",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [ "unit converter", "units converter",  "convert unit",  "change unit",],
};

export default App;
