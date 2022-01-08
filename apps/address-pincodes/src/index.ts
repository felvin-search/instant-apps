import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/address-pincodes",
  name: "Address Pincodes",
  description: "Returns the pincode based on the address entered.",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["Pincode of New Delhi", "Pincode of Ranchi"],
};

export default App;
