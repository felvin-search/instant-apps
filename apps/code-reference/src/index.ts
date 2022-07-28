import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/code-reference",
  name: "Code Reference",
  description: "Returns the code Reference of desired algorithm and language",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "find <code>",
    "how <code>",
    
  ],
};

export default App;
