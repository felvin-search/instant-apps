import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/ip-address",
  name: "my-ip",
  description: "Returns the Ip address of the user",
  queryToData,
  Component,
};

export default App;
