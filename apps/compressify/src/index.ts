import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/compressify",
  name: "Image-compressor",
  description: "Takes an image and compresses it",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["compress image", "image compressor"],
};

export default App;
