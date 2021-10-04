import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/",
  name: "Dictionary App",
  description: "A simple dictionary app to define as english word.",
  queryToData,
  Component,
};

export default App;
