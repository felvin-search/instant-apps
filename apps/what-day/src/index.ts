import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/what-day",
  name: "WhatDay",
  description: "Shows what day is on a particular date",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "what day was yesterday",
    "what day is 01/01/2000",
    "what day is it tomorrow",
  ],
};

export default App;
