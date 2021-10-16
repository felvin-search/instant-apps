import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/markdown-to-html",
  name: "Markdown To HTML",
  description: "Converts markdown text to html which has the same output",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["convert markdown into html", "markdown to html", "md to html"]
};

export default App;
