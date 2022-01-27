import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/is-prime",
  name: "is-prime",
  description: "Check if a number is prime or not",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["is 29 a prime number"],
};

export default App;
