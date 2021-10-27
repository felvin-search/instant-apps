import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/crop-image",
  name: "Image Cropper",
  description: "Instant app for cropping images.",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["crop image",
  "crop photo",
  "crop picture",
  "image cropper",
  "photo cropper"],
};

export default App;
