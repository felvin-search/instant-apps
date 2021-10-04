import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/joke-generator",
  name: "Random Joke Generator",
  description: "I tell random jokes",
  queryToData,
  Component,
};
export default App;
