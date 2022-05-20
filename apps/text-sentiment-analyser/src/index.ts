import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/text-sentiment-analyser",
  name: "text-sentiment-analyser",
  description: "Check How Your Text Sounds To Other",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
   exampleSearchQueries: ["text sentiment","mood checker","sentiment"],
};

export default App;
