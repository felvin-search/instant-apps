import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/uuid",
  name: "UUID",
  description: "I generate uuid strings",
  queryToData,
  Component,
};

export default App;
