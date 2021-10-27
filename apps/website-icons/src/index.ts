import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/website-icons",
  name: "Website Icons",
  description: "Shows the icon/favicon for any website",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["wikipedia.org icon", "website favicon"],
};

export default App;
