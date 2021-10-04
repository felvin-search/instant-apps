import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/app-id",
  name: "My App",
  description: "My App description",
  queryToData,
  Component,
};

export default App;
