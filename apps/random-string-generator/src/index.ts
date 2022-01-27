import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/random-string-generator",
  name: "Random String Generator",
  description: "App to generate a random string",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "random password",
    "random string",
    "new password",
    "new string",
  ],
};

export default App;
