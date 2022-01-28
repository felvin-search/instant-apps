import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/http-status-codes",
  name: "HTTP status codes",
  description: "Returns a description of http status codes",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["200 status", "305 http code"],
};

export default App;
