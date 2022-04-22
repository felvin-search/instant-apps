import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/pomodoro",
  name: "pomodoro",
  description: "It a simple pomodoro timer to make you more productive",
  queryToData,
  Component,
  // screenshotPath: "./files/screenshot.png",
  // exampleSearchQueries: [],
};

export default App;
