import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/instant-app-details",
  name: "Instant App Details",
  description:
    "a meta instant app that shows details of all the felvin instant apps",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["list all felvin instant apps details"],
};

export default App;
