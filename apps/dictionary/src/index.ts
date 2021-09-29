import { InstantApp } from "@felvin-search/core";
import queryToData from "./server";
import Component from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/dictionary",
  name: "Dictionary",
  description: "A simple dictionary app to define an english word.",
  queryToData,
  Component,
};

export default App;
