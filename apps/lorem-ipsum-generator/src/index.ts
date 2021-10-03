import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/lorem-ipsum",
  name: "Lorem Ipsum Generator",
  description: "Lorem Ipsum Generator",
  queryToData,
  Component,
};
export default App;
