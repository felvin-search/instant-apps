import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/ip-address",
  name: "my-ip",
  description: "Returns the Ip address of the user",
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["what is my ip address?", "ip address"],
  queryToData,
  Component,
};

export default App;
