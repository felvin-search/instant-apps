import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/courier-tracker",
  name: "Courier Tracker",
  description: "View any courier package status using Pickrr API",
  queryToData,
  Component,
};

export default App;
