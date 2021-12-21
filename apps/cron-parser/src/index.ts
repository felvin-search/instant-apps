import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/cron-parser",
  name: "Cron Parser",
  description: "Parses cron commands to human readable statements",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["parse cron", "cron * * * * *", "cron parser"],
};

export default App;
