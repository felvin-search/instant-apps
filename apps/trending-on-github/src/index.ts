import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/trending-on-github",
  name: "Trending On Github",
  description: "shows trending repositories on github from that day",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["What's trending on github today", "list of github trending repositories"],
};

export default App;
