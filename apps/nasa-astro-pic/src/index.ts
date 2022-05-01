import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/nasa-astro-pic",
  name: "NASA astronomy picture of the day (APOD)",
  description: "uses nasa api to get the astronomy picture of the day ",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["astronomy picture"],
};

export default App;
