import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/latex-render",
  name: "Latex Render",
  description: "Enter latex strings to generate output on the fly.",
  queryToData,
  Component,
};

export default App;
