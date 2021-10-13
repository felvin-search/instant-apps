import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/morse-code-generator",
  name: "Morse Code Generator",
  description: "Encodes text message to Morse Code and Vice-Versa",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["convert morse code to text"],
};

export default App;
