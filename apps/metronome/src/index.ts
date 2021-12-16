import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-search-apps/metronome",
  name: "Metronome",
  description: "Plays a metronome with set bpm",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: ["metronome", "play metronome", "count bpm", "play bpm","play metronome"],
};

export default App;
