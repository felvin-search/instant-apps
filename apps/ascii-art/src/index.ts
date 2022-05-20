import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/ascii-art",
  name: "Ascii Art",
  description: "Generates Ascii art form Text",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["ascii art"],
};

export default App;
