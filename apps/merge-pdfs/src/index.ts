import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/merge-pdfs",
  name: "Merge PDFs",
  description: "Merges multiple PDF files into 1 PDF file",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["merge pdf files", "combine pdfs into single pdf"],
};

export default App;
