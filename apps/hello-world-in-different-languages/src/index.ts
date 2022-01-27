import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/hello-world-in-different-languages",
  name: "Hello World In Different Languages",
  description:
    "Shows the introductory hello world code in many programming languages",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["hello world program", "code for hello world"],
};

export default App;
