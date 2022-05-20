import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/corrupt-pdf",
  name: "Corrupt PDF",
  description: "Corrupts PDF files",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["corrupt pdf file", "corrupt pdf", "pdf corrupt"],
};

export default App;
