import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/time-at-place",
  name: "Time at place",
  description: "App which shows time at places",
  queryToData,
  Component,
};
export default App;
