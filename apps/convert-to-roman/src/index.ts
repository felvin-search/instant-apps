import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/convert-to-roman",
  name: "to-roman",
  description: "converts a number into Roman number",
  queryToData,
  Component,
   screenshotPath: "./files/screenshot.png",
   exampleSearchQueries: ["convert 13 to Roman number"],
};

export default App;
