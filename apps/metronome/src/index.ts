import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/metronome",
  name: "metronome",
  description: "This app plays a metronome with a set bpm",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [
  "metronome",
  "Metronome",
  "bpm",
  "play metronome",
  "play bpm"],
};

export default App;
