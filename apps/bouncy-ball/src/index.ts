import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/bouncy-ball",
  name: "Bouncy Ball",
  description: "It's just a bouncy ball",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["bouncy ball"],
};

export default App;
