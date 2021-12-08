import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/unit-system",
  name: "Converting given length to metre(SI unit)",
  description: "This is a app which gives you the measurement in S.I unit metre from any kind of unit.",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["convert 32 inch to metres"],
};

export default App;
