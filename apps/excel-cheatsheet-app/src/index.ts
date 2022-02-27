import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/excel-cheatsheet-app",
  name: "Excel Cheatsheet",
  description: "Excel Cheatsheet",
  queryToData,
  Component,
  // screenshotPath: "./files/screenshot.png",
  // exampleSearchQueries: [],
};

export default App;
