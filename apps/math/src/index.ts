import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/math",
  name: "math",
  description: "App which can do math stuff",
  queryToData,
  Component,
};
export default App;
