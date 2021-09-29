import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/random-joke",
  name: "Random Joke",
  description: "I tell random jokes",
  queryToData,
  Component,
};

export default App;
