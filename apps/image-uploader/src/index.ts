import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/image-uploader",
  name: "Image Uploader",
  description:
    "A Photo hosting service Instant App that greatly facilitates everyday work with various types of graphics. It helps to create a URL for our images quickly to promote sharing them with other users easily.",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["upload image", "host an image", "get image url"],
};

export default App;
