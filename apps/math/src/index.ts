import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/math",
  name: "Math",
  description: "App which can do math stuff",
  queryToData,
  Component,
};

export default App;
