import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/lorem-ipsum-generator",
  name: "Lorem Ipsum Generator",
  description: "Lorem Ipsum Generator",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["lorem ipsum generator", "lorem ipsum"],
};
export default App;
