import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/lorem-ipsum-generator",
  name: "Lorem Ipsum Generator",
  description: "Lorem Ipsum Generator",
  queryToData,
  Component,
};

export default App;
