import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/isbn-book-info",
  name: "ISBN Book Info",
  description: "Gives information about book from isbn code",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["book 9781718500457", "isbn 9781847941831"],
};

export default App;
