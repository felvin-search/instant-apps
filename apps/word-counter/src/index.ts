import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/word-counter",
  name: "Word Counter",
  description: "This counts words, letter/characters",
  queryToData,
  Component,
};

export default App;
