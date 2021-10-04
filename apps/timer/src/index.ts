import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/",
  name: "Timer App",
  description: "Set an instant timer using searhc. e.g. 15 minutes timer",
  queryToData,
  Component,
};
export default App;
