import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/screen-size",
  name: "Sizer",
  description: "Displays the resolution of the user&#x27;s screen",
  queryToData,
  Component,
};

export default App;
