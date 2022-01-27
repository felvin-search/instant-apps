import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/screen-size",
  name: "Sizer",
  description: "Displays the resolution of the user&#x27;s screen",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["screen resolution", "screen size"],
};

export default App;
