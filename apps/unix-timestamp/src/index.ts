import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/unix-timestamp",
  name: "Unix Timestamp Convertor",
  description:
    "Converts time from unix timestamp format to locale string and vice versa",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
    "unix time to locale string",
    "unix timestamp right now",
  ],
};

export default App;
