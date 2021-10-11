import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/morse-code-generator",
  name: "Morse Code Generator",
  description: "Encodes text message to Morse Code and Vice-Versa",
  queryToData,
  Component,
};

export default App;
