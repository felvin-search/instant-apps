import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/jwt-decoder",
  name: "JWT Decoder",
  description: "An instant app which decodes the data stored ina jwt token",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["decode JWT", "JWT decoder"],
};

export default App;
