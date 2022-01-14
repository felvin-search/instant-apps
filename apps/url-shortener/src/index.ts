import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/url-shortener",
  name: "URL Shortener",
  description: "An instant app which shortens urls",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "shorten url",
    "url shortener",
    "online url shortener",
  ],
};

export default App;
