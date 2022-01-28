import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/joke-generator",
  name: "Random Joke Generator",
  description: "I tell random jokes",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["tell me a joke", "random joke"],
  queryToData,
  Component,
};
export default App;
