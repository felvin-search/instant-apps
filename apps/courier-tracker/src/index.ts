import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/courier-tracker",
  name: "Courier Tracker",
  description: "View any courier package status using Pickrr API",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["current status of 8695542668"],
};

export default App;
