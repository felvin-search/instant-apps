import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/url-encoder-decoder",
  name: "Url Encoder and Decoder",
  description: "This simple app will help you to encode your url and then decode them easily",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["url encoder and decoder"],
};

export default App;
