import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/qr-code-generator",
  name: "QR Code Generator",
  description: "Generates a temporary QR tag for any url (valid for a day)",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["Generate QR code for website", "QR code for url", "Make QR for felvin"],
};

export default App;
