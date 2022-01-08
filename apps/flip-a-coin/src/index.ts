import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/flip-a-coin",
  name: "flip-a-coin",
  description:
    "an instant app which simulates flipping a coin and results in either Heads or Tails",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["flip a coin", "flip", "toss", "toss a coin"],
};

export default App;
